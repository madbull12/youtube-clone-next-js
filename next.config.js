/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["lh3.googleusercontent.com","i.ytimg.com","yt3.ggpht.com"]
  }
}

module.exports = nextConfig
