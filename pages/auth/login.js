import { Main, TextLink } from '@/components'

export default function LoginPage() {
  return (
    <Main>
      Sign in with Google | Sign in with Facebook Don't have an account?{' '}
      <TextLink href="/auth/register" children="Register" />
    </Main>
  )
}
