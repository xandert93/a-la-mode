import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

/*
[...nextauth] ensures that all requests to /api/auth/* (/signin, /callback, /signout, etc.) 
are handled by NextAuth.

*/

// initialize NextAuth.js in a Route Handler
// see here for advanced initialisation: https://next-auth.js.org/configuration/initialization#advanced-initialization

export const authOptions: NextAuthOptions = {
  // For extensive options list, see here: https://next-auth.js.org/configuration/options

  /*
  Choose how you want to save the user session. 
  The default is "jwt" - sending an encrypted JWT (JWE) a session cookie.
  
  If you use an adapter however (?), it defaults to "database" instead. 
  You can still force a JWT session by explicitly defining "jwt".
  
  When using "database", the session cookie will only contain a sessionToken value, 
  which is used to look up the session in the database.
  
  */
  session: {
    strategy: 'jwt',
    // a session becomes idle when the client hasn't reauthenticated for a period of time
    // I think (?) reauth only takes place when the client revisits our app, refreshes our app etc.
    // I also think that every reauth, they get a new JWT
    // for example, if the client leaves our app tab for another app, their session becomes idle
    // time (s) before an idle session becomes invalid
    maxAge: 30 * 24 * 60 * 60, // 30 days (default)
    // so client could leave our app for 29 days, come back to it (which will make reauth happen)
    // and then get issued a new token, giving them another 30 days
    // we should also recall that by default, the <SessionProvider> refetches session on focus,
    // which also procures a new JWT

    // not used for 'jwt' strategy
    // time (s) that needs to elapse for a write to database to extend a session
    updateAge: 24 * 60 * 60, // 1 day (default) i.e. max once per day
  },

  /*
  secret: string
  Required in production to hash tokens, sign/encrypt cookies etc.
  To generate, Fireship recommended: https://generate-secret.vercel.app/32
  Note that, NextAuth will look for this value on process.env.NEXTAUTH_SECRET, so
  doing that would mean we wouldn't have to write it here
  */

  // specify each desired OAuth provider=Fn. provider accepts options of { clientId, clientSecret }
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!, // how Fireship guy did it (type assertion)
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // add more providers here
  ],
  callbacks: {
    signIn: ({ user, account, profile, email, credentials }) => {
      // for GitHub & Google:
      // user => { id, name, email, image }
      // for GitHub, then Google:
      // account => { provider: 'github', type: 'oauth', access_token } + 3...
      // account => same as above plus some others e.g. id_token
      // for GitHub, then Google
      // profile (all the general stuff) - login (username), bio, location + loads!...
      // profile (general stuff again) - given_name, family_name, locale etc.

      // for GitHub & Google:
      // email => undefined, credentials => undefined

      // CAN IMMEDIATELY SEE - Different providers offer different user blueprints
      // adding them to our DB could be some work (unless we no longer do that lol)
      // if doing my old way of adding to DB, don't (!) choose too many OAuth providers to avoid this work

      return true
    },
    redirect: ({ url, baseUrl }) => {
      return url
    },
    jwt: ({ token, session, user, account, profile }) => {
      // token => { name, email, picture, sub, iat, exp, jti } - the payload?
      // the .jti claim is used to identify a token and associate it with a specific issuer

      return token
    },
  },

  // now go to GitHub and get credentials for server:
  // Settings > Developer Settings > OAuth Apps > Register New App. Fill in form, get credentials, add to .env
  // For "Callback URL" (the redirect URL after successful auth), apply
  // http://localhost:3000/api/auth/callback/github, which has been set up by
  // provider above. GitHub will append and authorisation code to the URL, which will allow NextAuth to get access to
  // the OAuth user

  // For Google OAuth, use the following callback URL: http://localhost:3000/api/auth/callback/google / <provider-name>
  // When move to production, be sure to update the callback URLs to the deployment origin
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } // https://next-auth.js.org/configuration/initialization#route-handlers-app

/*  
Internally, NextAuth detects initialisation in a Route Handler (route.js) and 
returns a handler that returns a Response instance. 

A Route Handler's require the export of named HTTP method functions 
that handle a request and return a response. 

NextAuth needs the GET and POST handlers, so we must export those two.
GET allows browser to make GET request to the URL (delivers the OAuth page)
While POST allows browser to make POST request from that page? Maybe
*/

/*
when GET made to the endpoint, getting this warning in console:

[next-auth][warn][NEXTAUTH_URL] 
https://next-auth.js.org/warnings#nextauth_url

*/

/*
 JSM wrapped <SessionProvider> around RootLayout 
 {children} while, Fireship wrapped around <html>. Doesn't really matter.

 when OAuth signout clicked, it appears that the entire app seems to refresh + reboot. Why?
*/
