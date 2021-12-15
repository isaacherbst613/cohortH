const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/popup.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
