const withTwin = require('./withTwin.js')
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // compiler: {
  //   styledComponents: true,
  // },
}

module.exports = withTwin(nextConfig)
