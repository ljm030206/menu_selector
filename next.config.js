/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    'rc-picker', 
    'rc-util',
    'rc-pagination',
    'rc-notification'
  ],
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig