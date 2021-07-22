/** @type {import('next/dist/next-server/server/config').NextConfig} */
module.exports =  {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components', 'layouts', 'utils', 'hooks', 'contexts', 'state']
  },
}
