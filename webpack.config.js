const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const devMode = process.env.NODE_ENV === 'production'

console.log(process.env.NODE_ENV);

module.exports = {
  entry: {
      app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
     new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin(),
     new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: [ devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader',]
      }
    ]
 },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};