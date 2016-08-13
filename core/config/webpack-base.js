var path = require('path');

var port = 8000;
var srcPath = path.join(__dirname, '/../public');

// The url after http://localhost:8000/
// that loads app
var appRenderPathUrl = '';

module.exports = {
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, '/../dist/public'),
    filename: 'index.js',
    publicPath: appRenderPathUrl
  },
  devServer: {
    contentBase: './core/public',
    historyApiFallback: true,
    hot: true,
    colors: true,
    port: port,
    publicPath: appRenderPathUrl,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: srcPath + '/actions/',
      components: srcPath + '/components/',
      sources: srcPath + '/sources/',
      stores: srcPath + '/stores/',
      styles: srcPath + '/styles/'
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, '/../public'),
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
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.json$/, loader: "json-loader" },
      // {
      //   test: /\.(png|jpg|gif|woff|woff2)$/,
      //   loader: 'url-loader?limit=8192'
      // },
      {
        test: /\.svg$/,
        loader: require.resolve('./dangerouslySetInnerHTML.loader'),
        exclude: /node_modules/,
      }
    ]
  }
};
