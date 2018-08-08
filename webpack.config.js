var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 3000
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?url=false',
          'sass-loader'
        ]
      }
    ]
  }
};
