const path = require('path');
const webpack = require('webpack');
const plugins = require('./webpack/plugins');
const loaders = require('./webpack/loaders');


if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    plugins.push(new webpack.BannerPlugin(`Last update: ${new Date().toString()}`));
}


module.exports = {
    entry: [
        path.join(__dirname, 'src/index')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: [
                'babel?babelrc'
            ],
            exclude: /node_modules/
        },
        ...loaders]
    }
};
