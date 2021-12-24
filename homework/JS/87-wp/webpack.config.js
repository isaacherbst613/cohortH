const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESlintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {index: './src/index.js'},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module:{
    rules: [
      {
      test:  /\.(png|mp3)$/i,
       type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({title: 'Webpack Live Server', template: './src/snake.html'}),
    new ESlintPlugin()
  ]
};