const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  module: {
         rules: [
            {
                exclude: '/node_modules/',
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
           {
            test: /\.css$/,
             use: [
               'style-loader',
               'css-loader'
             ]
           }
         ]
  }   
};