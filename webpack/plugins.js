const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
        title: 'RSuite example',
        filename: 'index.html',
        template: 'src/index.html',
        theme: 'default',
        inject: true,
        hash: true
    })
];
