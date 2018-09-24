const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './src/FormBuilder/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  }
});
