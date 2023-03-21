module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        fiber: require('fibers'),
      },
      scss: {
        additionalData: `@import "@/assets/tailwind.scss";`,
      },
    },
  },
};
