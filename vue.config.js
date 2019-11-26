module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/global-scss/_variables.scss";
          @import "@/global-scss/_fonts.scss";
          @import "@/global-scss/_transitions.scss";
          @import "@/global-scss/customs.scss";
        `
      }
    }
  }
};
