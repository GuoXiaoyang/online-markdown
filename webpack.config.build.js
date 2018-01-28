const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = Object.assign(webpackConfig, {

  devtool: 'cheap-module-source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  plugins: webpackConfig
    .plugins
    .concat([
      new webpack
        .optimize
        .CommonsChunkPlugin({
          names: ['vendor', 'manifest']
        }),

      new CleanWebpackPlugin(['dist']),
      new CopyWebpackPlugin([
        {
          context: path.join(__dirname, './public/pageThemes'),
          from: '*',
          to: './pageThemes',
          force: true
        },
        {
          context: path.join(__dirname, './public/codeThemes'),
          from: '*',
          to: './codeThemes',
          force: true
        },
        {
          context: path.join(__dirname, './public'),
          from: 'demo.md',
          to: './demo.md',
          force: true
        }
      ])
    ])

});
