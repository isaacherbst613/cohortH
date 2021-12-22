const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {index: './src/index.js', popup: './src/popup.js'},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin(
    {title: 'Webpack Live Server', template: './src/html.html'}
  )],
};
