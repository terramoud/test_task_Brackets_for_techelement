const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: {
    index: './src/func/index.js',
    check_func: './src/check_func/check_func.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    port: 5000,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // 'style-loader',

          {
            // Extracts CSS into separate files
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "./jquery-3.4.1.min",
      jQuery: "./jquery-3.4.1.min",
      "window.jQuery": "./jquery-3.4.1.min'",
      "window.$": "./jquery-3.4.1.min",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/func/index.html',
      inject: true,
      chunks: ['index'],
      defer: ['app'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/check_func/check_func.html',
      chunks: ['check_func'],
      inject: true,
      defer: ['app'],
      filename: 'check_func.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  }
};
