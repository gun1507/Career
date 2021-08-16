// // vue.config.js
// module.exports = {
//     publicPath : process.env.NODE_ENV === 'production'
//       ? '/Vuetify-md-pro-clone/'
//       : '/'
// }
const path = require('path')
var webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  filenameHashing: false,
  productionSourceMap: false,

  configureWebpack : {
    optimization : {
      splitChunks : {
          cacheGroups: {
            vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -30,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: 0,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  // configureWebpack: {
  //   plugins: [
  //     new webpack.optimize.LimitChunkCountPlugin({
  //         maxChunks: 20
  //     }),
  //   ],
  // },  
  // filenameHashing: false,
  // productionSourceMap: false,
 

  devServer: {
    proxy: {
      '/v1' : {
          target: 'https://vault.daumkakao.io',
          ws: true,
          changeOrigin: true,
      },
      '/api' : {
          target: 'http://127.0.0.1:8000',
          // target :"http://diffuser.dev.daumkakao.io",
          ws: true,
          changeOrigin: true,
      },
      '/learn' : {
          target: 'http://diffuser-learn.dev.daumkakao.io',
          ws: true,
          changeOrigin: true,
      },
    },
    host : '0.0.0.0',
    disableHostCheck :true,
    // historyApiFallback: true,
    // disableHostCheck: true,
    // overlay: true,
    headers: {
      hot: "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    // https: false,
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  publicPath: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') ? '/static/' : '/',
  // publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  outputDir: path.resolve(__dirname, '../diffuser_backend_renewal/static'),


}
