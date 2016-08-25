var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

module.exports = function (baseConfig) {
  console.log('_____________', path.join(__dirname, '../public/index'));
  var config = _.merge({
    entry: path.join(__dirname, '../public/index.js'),
    cache: false,
    devtool: 'sourcemap',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': 'production'
        }
      }),
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
