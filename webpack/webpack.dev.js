const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
}

const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
}

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  // turn on for production deploy
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: {
              loader: 'babel-loader',
              options: {
                  presets: ['vue-app']
              }
           },
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // include: [resolve('js'), resolve('node_modules/webpack-dev-server/client')]
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
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
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
  devServer: {
    stats: 'errors-only',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 5500

  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      minify: minify,
      template: './src/views/index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      minify: minify,
      collapseWhitespace: true,
      template: './src/views/episodes.html',
      filename: './episodes.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      minify: minify,
      template: './src/views/about.html',
      filename: './about.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      minify: minify,
      template: './src/views/episode.html',
      filename: './episode.html'
    }),
    new CopyWebpackPlugin([{
        from: 'src/fonts',
        to: 'fonts'
      },
      {
        from: 'src/images',
        to: 'images'
      },
      {
        from: 'src/js/productbclub.js',
        to: 'productbclub.js'
      },
    ]),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),
    new VueLoaderPlugin()
  ]
}