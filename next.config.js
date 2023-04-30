/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/material'], // 1
}

module.exports = nextConfig

/*
🔥 1) out of nowhere, started getting this error: https://craigglennie.com/posts/2020/fixing-unexpected-token-export-in-nextjs
      from an MUI node module file. Next documentation recommended applying the configuration I've set

*/
