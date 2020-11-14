const path = require(`path`);
const HtmlPlugin = require(`html-webpack-plugin`);
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`);
const CopyPlugin = require(`copy-webpack-plugin`);

module.exports = {
  mode: `development`,
  devServer: {
    contentBase: path.resolve(__dirname, `./dist`),
    open: true,
    port: 8003,
  },
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
    filename: `[name]_bundle.js`,
    path: path.resolve(__dirname, `dist`),
    iife: true,
  },
  devtool: `source-map`,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlPlugin({
      template: `./index.html`,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `./fonts`),
          to: path.resolve(__dirname, `./dist/fonts`),
        },
        {
          from: path.resolve(__dirname, `./img`),
          to: path.resolve(__dirname, `./dist/img`),
        },
        {
          from: path.resolve(__dirname, `favicon.ico`),
          to: path.resolve(__dirname, `./dist`),
        },
        {
          from: path.resolve(__dirname, `./css`),
          to: path.resolve(__dirname, `./dist/css`),
        },
      ],
    }),
  ],
};
