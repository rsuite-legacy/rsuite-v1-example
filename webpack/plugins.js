const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const extractLess = require('./extractLess');

module.exports = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new HtmlwebpackPlugin({
    title: 'RSuite example',
    filename: 'index.html',
    template: 'src/index.html',
    theme: 'default',
    inject: true,
    hash: true
  }),
  extractLess
];
