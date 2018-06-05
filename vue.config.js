const path = require('path')

module.exports = {
  lintOnSave: false,
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        includePaths: [
          path.resolve(__dirname, 'src/style')
        ]
      },
    },
  },
};
