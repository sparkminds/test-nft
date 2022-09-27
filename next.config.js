/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
  images: {
    domains: ['ik.imagekit.io', 'media.pixxiti.com', 'firebasestorage.googleapis.com']
  },
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "./styles/variable.scss";@import "./styles/mixin.scss";`,
},
}

module.exports = nextConfig
