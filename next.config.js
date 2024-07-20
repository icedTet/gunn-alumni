// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: true, //process.env.NODE_ENV === 'development',
//   // importScripts: ['https://arc.io/arc-sw-core.js'],
//   maximumFileSizeToCacheInBytes: 50000000,
//   runtimeCaching: [
//     {
//       urlPattern: /^https:\/\/assets\.disadus\.app\//,
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'assets-cache',
//         expiration: {
//           maxEntries: 9999,
//           maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
//         },
//       },
//     },

//     {
//       urlPattern: /^https:\/\/fonts\./,
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'google-fonts-stylesheets',
//         expiration: {
//           maxEntries: 50,
//           maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year,
//         },
//       },
//     },
//     {
//       urlPattern: /^https:\/\/i\.ibb\.co\//,
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'images',
//         expiration: {
//           maxEntries: 5000,
//           maxAgeSeconds: 60 * 60 * 24 * 14, // 2 weeks,
//         },
//       },
//     },
//     {
//       // cache all profile images from https://profiles.disadus.app
//       urlPattern: /^https:\/\/profiles\.disadus\.app\//,
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'profiles',
//         expiration: {
//           maxEntries: 10000000,
//           maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year,
//         },
//       },
//     },
//     {
//       urlPattern: /^https:\/\/assets1\.disadus\.app\//,
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'srcAssets',
//         expiration: {
//           maxEntries: 10000000,
//           maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year,
//         },
//       },
//     },
//     //Cache user background images from https://images.alphacoders.com/
//     {
//       urlPattern: /https?:\/\/images/i,
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'base-image-assets',
//         expiration: {
//           maxEntries: 1000000,
//           maxAgeSeconds: 24 * 60 * 60 * 30, // 30 days,
//         },
//       },
//     },
//     {
//       urlPattern: /\.(jpg|jpeg|gif|png|svg|ico|webp)/i,
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'external-static-image-assets',
//         expiration: {
//           maxEntries: 1000000,
//           maxAgeSeconds: 24 * 60 * 60 * 30, // 30 days,
//         },
//       },
//     },
//     {
//       urlPattern: /\/external\/resource/,
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'external-resources',
//         expiration: {
//           maxEntries: 1000000,
//           maxAgeSeconds: 24 * 60 * 60 * 365, // 1 year,
//         },
//       },
//     },
//   ],
//   publicExcludes: ['!robots.txt', '!sitemap.xml.gz', '!landing/**/*', '!external/resource/**/*'],
//   buildExcludes: [/middleware-manifest.json$/],
//   cacheOnFrontEndNav: true,
//   reloadOnOnline: true,
//   dynamicStartUrl: false,
//   scope: '/',
// })
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
/** @type {import('next').NextConfig} */
// const pwaConfig =
module.exports = ({
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
      },
    }
    // config.module.rules.push({
    //   test: /\.worker\.js$/,
    //   use: { loader: 'worker-loader' },
    // })
    // config.plugins.push(new NodePolyfillPlugin())
    // config.plugins.push(new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    // })) //TODO: Uncomment to enable bundle analyzer
    // Important: return the modified config
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '**',
      }
    ],
  },
  // async headers() {
  // },
})
// module.exports = {
//   reactStrictMode: true,
//   // pwa: {
//   //   dest: 'public',
//   //   scope: '/app',
//   //   disable: process.env.NODE_ENV === 'development',
//   //   importScripts: ['https://arc.io/arc-sw-core.js'],
//   //   maximumFileSizeToCacheInBytes: 50000000,
//   // },
// }
