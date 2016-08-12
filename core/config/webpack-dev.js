var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

module.exports = function (baseConfig) {
  var config = _.merge({
    entry: [
      'webpack-dev-server/client?http://127.0.0.1:8000',
      'webpack/hot/only-dev-server',
      './core/public/index'
    ],
    cache: true,
    devtool: 'eval',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  }, baseConfig);

  // Add needed loaders
  config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'react-hot!babel-loader',
    include: path.join(__dirname, '/../public')
  });

  return config;
};
