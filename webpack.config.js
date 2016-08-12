'use strict';

var path = require('path');
var args = require('minimist')(process.argv.slice(2));
var configDirPath = '/core/config';

// List of allowed environments
var allowedEnvs = ['dev', 'dist', 'test'];

// Set the correct environment
var env = 'dev';
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
}

/**
 * base config is object others are factories that take base,
 * and return merged config for particular env
 */
var configs = {
  base: require(path.join(__dirname, configDirPath + '/webpack-base')),
  dev: require(path.join(__dirname, configDirPath + '/webpack-dev'))
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
  return configs[usedEnv](configs.base);
}

module.exports = buildConfig(env);
