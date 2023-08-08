// const withTwin = require('./withTwin.js')
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
}

const removeImports = require('next-remove-imports')()
const withMDX = require('@next/mdx')()

module.exports = withMDX(nextConfig)
