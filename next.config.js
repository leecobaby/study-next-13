// const withTwin = require('./withTwin.js')
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
}

const removeImports = require('next-remove-imports')()

module.exports = removeImports(nextConfig)
