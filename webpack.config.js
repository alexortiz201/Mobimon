'use strict';

var path = require('path');
var args = require('minimist')(process.argv.slice(2));
var configDirPath = 'core/config';

// List of allowed environments
var allowedEnvs = ['dev', 'dist', 'test'];

// Set the correct environment
var env = 'dev';
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
}

// // Get available configurations
var configs = {
  base: require(path.join(__dirname, configDirPath + '/webpack-base'))
  //dev: require(path.join(__dirname, 'config/webpack-dev')),
  //dist: require(path.join(__dirname, 'config/webpack-dist')),
  //test: require(path.join(__dirname, 'config/webpack-test'))
};

/**
 * Get an allowed environment
 * @param  {String}  env
 * @return {String}
 */
function getValidEnv(env) {
  var isValid = (env && env.length) > 0 &&
    allowedEnvs.indexOf(env) !== -1;

  return isValid ? env : 'dev';
}

/**
 * Build the webpack configuration
 * @param  {String} env Environment to use
 * @return {Object} Webpack config
 */
function buildConfig(env) {
  var usedEnv = getValidEnv(env);
  return configs[usedEnv];
}

module.exports = buildConfig(env);

// module.exports = {
//   entry: './core/public/index.js',
//   output: {
//     filename: '/dist/bundle.js',
//     path: __dirname
//   }
  // ,
  // preLoaders: [
  //   {
  //     test: /\.(js|jsx)$/,
  //     include: path.join(__dirname, 'src'),
  //     loader: 'eslint-loader'
  //   }
  // ],
  // module : {
  //   loaders : [
  //     {
  //       test : /\.jsx?/,
  //       include : APP_DIR,
  //       loader : 'babel'
  //     }
  //   ]
  // }
};
