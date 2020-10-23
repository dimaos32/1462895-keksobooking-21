const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/backend.js`,
    `./js/form.js`,
    `./js/pin.js`,
    `./js/card.js`,
    `./js/filter.js`,
    `./js/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false,
  devServer: {
    port: 8003,
  },
};
