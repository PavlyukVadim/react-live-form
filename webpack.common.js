const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules',
    ],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'react-hot-loader/webpack',
          'babel-loader',
          'eslint-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ],
  }
};
