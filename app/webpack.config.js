/* eslint-env node */
/* eslint-disable no-console */
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;

module.exports = (env = {}, options = {}) => {
  const shouldMinify = options.mode === 'production';
  const shouldUseAnalyzer = env.analyzer === true;

  console.log('🖥  Building static site');

  if (shouldMinify) {
    console.log('📦  Minifying code');
  }

  if (shouldUseAnalyzer) {
    console.log('🕵🏻  Starting bundle analyzer');
  }

  return {
    devServer: {
      disableHostCheck: true,
      stats: 'minimal'
    },
    devtool: shouldMinify ? 'source-map' : 'cheap-module-eval-source-map',
    entry: {
      site: ['babel-polyfill', 'whatwg-fetch', './source/app.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          enforce: 'pre',
          test: /\.scss$/,
          exclude: /node_modules/,
          use: 'import-glob'
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract([
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: shouldMinify,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: { plugins: [autoprefixer], sourceMap: true }
            },
            { loader: 'resolve-url-loader' },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ])
        },
        {
          test: /\.(svg|png|jpg|woff2?|ttf|eot)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]'
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
      alias: {
        components: path.resolve(__dirname, 'source/components'),
        js: path.resolve(__dirname, 'source/js')
      }
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new LodashModuleReplacementPlugin({
        paths: true
      }),
      new SuppressChunksPlugin([
        {
          name: 'style',
          match: /\.js(.map)?$/
        }
      ]),
      new HtmlPlugin({
        template: 'source/index.html'
      })
    ]
  };
};
