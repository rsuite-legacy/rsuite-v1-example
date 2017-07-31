const { resolve } = require('path');
const webpack = require('webpack');
const commonPlugins = require('./webpack/plugins');
const commonRules = require('./webpack/rules');

const config = {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:3002',
    'webpack/hot/only-dev-server',
    resolve(__dirname, 'src/index')
  ],
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, ''),
    publicPath: '/'
  },
  plugins: [
    ...commonPlugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      ...commonRules
    ]
  }
};

module.exports = config;
