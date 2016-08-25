var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

module.exports = function (baseConfig) {
  var config = _.merge({
    entry: path.join(__dirname, '../../core/public/index'),
    cache: false,
    devtool: 'sourcemap',
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  }, baseConfig);

  config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: [
      path.join(__dirname, '/../public'),
      path.join(__dirname, '/../shared'),
      path.join(__dirname, '/../../cartridges')
    ]
  });

  return config;
};
