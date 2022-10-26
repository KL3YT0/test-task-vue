const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/': {
        ws: false,
        changeOrigin: true,
        target: 'https://parser.api-compas-goo.ru',
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/app.scss";`,
      },
    },
  },
});
