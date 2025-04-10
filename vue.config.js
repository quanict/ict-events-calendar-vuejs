const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_OFFLINE_MODE ? './' : process.env.VUE_APP_PUBLICH_PATH,
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new webpack.DefinePlugin({
        // Vue CLI is in maintenance mode, and probably won't merge my PR to fix this in their tooling
        // https://github.com/vuejs/vue-cli/pull/7443
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  },

  devServer: {
    // open: process.platform === 'darwin',
    // host: '0.0.0.0',
    port: 8088,
    // https: false
    allowedHosts: "all",
  },
})
