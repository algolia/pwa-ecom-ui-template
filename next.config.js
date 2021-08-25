const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPWA = require('next-pwa')

const ifdefOpts = {
  DEV: process.env.NODE_ENV === 'development',
  PROD: process.env.NODE_ENV === 'production',
  TEST: process.env.NODE_ENV === 'test',
}

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  }
]

/** @type {import('next/dist/next-server/server/config').NextConfig} */
module.exports = withPlugins([withBundleAnalyzer, withPWA], {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  eslint: {
    dirs: [
      'pages',
      'components',
      'layouts',
      'utils',
      'hooks',
      'contexts',
      'state',
    ],
  },
  images: {
    domains: ['img1.g-star.com'],
  },
  pwa: {
    dest: 'public',
    disable: ifdefOpts.DEV,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config) => {
    const rules = config.module.rules

    // Ifdef loader
    const ifdefLoader = {
      loader: 'ifdef-loader',
      options: ifdefOpts,
    }

    let babelRule
    rules.forEach((rule) => {
      if (rule.test && '.tsx'.match(rule.test)) {
        babelRule = rule
      }
    })

    if (Array.isArray(babelRule.use)) {
      babelRule.use.push(ifdefLoader)
    } else {
      babelRule.use = [babelRule.use, ifdefLoader]
    }

    // SVGR loader
    rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    })

    return config
  },
})
