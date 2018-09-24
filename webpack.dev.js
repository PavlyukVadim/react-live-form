const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './src/index.js',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
});
