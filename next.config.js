const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPWA = require('next-pwa')
const IconsPlugin = require('unplugin-icons/webpack')

const ifdefOpts = {
  DEV: process.env.NODE_ENV === 'development',
  PROD: process.env.NODE_ENV === 'production',
  TEST: process.env.NODE_ENV === 'test',
}

/** @type {import('next/dist/next-server/server/config').NextConfig} */
module.exports = withPlugins([withBundleAnalyzer, withPWA], {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  generateBuildId: () => 'build',
  eslint: {
    dirs: ['pages', 'components', 'config', 'layouts', 'lib', 'utils', 'hooks'],
  },
  images: {
    domains: ['img1.g-star.com'],
  },
  pwa: {
    dest: 'public',
    disable: ifdefOpts.DEV,
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

    // Icons
    babelRule.test = /virtual:~icons|\.(tsx|ts|js|mjs|jsx)$/
    config.plugins.push(IconsPlugin({ compiler: 'jsx', jsx: 'react' }))

    return config
  },
})
