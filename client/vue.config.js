const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/',
  devServer: {
    port: 8080
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
        scss: {
          additionalData: `
        @import "@/style/_css-prop-vars.scss";
        @import "@/style/_css-reset.scss";
        @import "@/style/_global-elemets-style.scss";
        `
      }
    }
  }
})
