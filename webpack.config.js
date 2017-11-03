const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

const commonPlugins = require('./webpack/plugins');
const commonRules = require('./webpack/rules');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    ...commonPlugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false // eslint-disable-line
      }
    }),
    new webpack.BannerPlugin({ banner: `Last update: ${new Date().toString()}` }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
    rules: [
      ...commonRules
    ]
  }
};
