const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.(png|jpg|gif|svg|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader"},
          {loader: "sass-loader"}
      ],
      },
    ]
  },
  stats: 'errors-only',
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
        clearConsole: true,
      }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './episodes.html',
      filename: './episodes.html'
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './about.html',
      filename: './about.html'
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './episode.html',
      filename: './episode.html'
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './vue-index.html',
      filename: './vue-index.html'
    }),
    new CopyWebpackPlugin([
        { from: 'fonts', to: 'fonts' },
        { from: 'images', to: 'images' },
        { from: 'js/productbclub.js', to: 'productbclub.js' },
        { from: 'js/episode.json', to: 'episode.json' },
      ]),
    new MiniCssExtractPlugin({
        filename: "bundle.css",
    }),
    new VueLoaderPlugin()
  ]
}