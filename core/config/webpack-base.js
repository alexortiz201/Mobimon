var path = require('path');

var port = 8000;

// root, mobimon
var srcPath = path.join(__dirname, '../../');
// The url after http://localhost:8000/
// that loads app
var appRenderPathUrl = '';

module.exports = {
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, '/../dist/'),
    filename: 'index.js',
    publicPath: appRenderPathUrl
  },
  devServer: {
    contentBase: './core/public',
    historyApiFallback: true,
    hot: true,
    colors: true,
    port: port,
    publicPath: '',
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    // alias: {
    //   core: srcPath + '/core',
    //   coreConfig: srcPath + '/core/config',
    //   corePublic: srcPath + '/core/public',
    //   coreServer: srcPath + '/core/server',
    //   coreShared: srcPath + '/core/shared',
    //   shared: srcPath + '/shared/',
    //   catridges: srcPath + '/catridges/'
    // }
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, '/../public'),
          path.join(__dirname, '/../shared')
        ],
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.svg/, loader: 'svg-url-loader' }
      // {
      //   test: /\.(png|jpg|gif|woff|woff2)$/,
      //   loader: 'url-loader?limit=8192'
      // },
      // {
      //   test: /\.svg$/,
      //   loader: require.resolve('./dangerouslySetInnerHTML.loader'),
      //   exclude: /node_modules/,
      // }
    ]
  }
};
