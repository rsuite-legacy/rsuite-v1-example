const path = require('path');
const webpack = require('webpack');
const plugins = require('./webpack/plugins');
const loaders = require('./webpack/loaders');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        path.join(__dirname, 'src/index')
    ],
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: [
                'react-hot',
                'babel?babelrc'
            ],
            exclude: /node_modules/
        },
        ...loaders
        ]
    }
};
