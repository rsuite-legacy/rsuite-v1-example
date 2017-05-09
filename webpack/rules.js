const extractLess = require('./extractLess');
module.exports = [
  {
    test: /\.js$/,
    use: [
      'babel-loader?babelrc'
    ],
    exclude: /node_modules/
  }, {
    test: /\.less$/,
    loader: extractLess.extract({
      use: [{
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }],
      // use style-loader in development
      fallback: 'style-loader'
    })
  }, {
    test: /\.(jpg|png)$/,
    loader: 'url-loader'
  }, {
    test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
    loader: 'url-loader?limit=1&hash=sha512&digest=hex&size=16&name=resources/[hash].[ext]'
  }
];