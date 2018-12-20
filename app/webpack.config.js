/* eslint-env node */
/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const cssnano = require('cssnano');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;

module.exports = (env = {}, options = {}) => {
  const isProduction = options.mode === 'production';
  const shouldUseAnalyzer = env.analyzer === true;

  if (isProduction) {
    console.log('📦  Minifying code');
  }

  if (shouldUseAnalyzer) {
    console.log('🕵🏻  Starting bundle analyzer');
  }

  return {
    devServer: {
      disableHostCheck: true,
      inline: false,
      stats: 'minimal'
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    entry: {
      client: './source/static-client.js',
      server: './source/static-server.js',
      style: './source/scss/style.scss'
    },
    output: {
      filename: '[name].[chunkhash].js',
      globalObject: 'this',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist')
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
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer].concat(isProduction ? [cssnano] : []),
                sourceMap: true
              }
            },
            { loader: 'resolve-url-loader' },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        },
        {
          test: /\.(svg|png|jpg|woff2?|ttf|eot)$/,
          exclude: [path.resolve(__dirname, './source/assets/icons')],
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]'
            }
          }
        },
        {
          test: /\.svg$/,
          include: [path.resolve(__dirname, './source/assets/icons')],
          use: [
            { loader: 'svg-react-loader' },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeViewBox: false },
                  { removeAttrs: { attrs: '(class|fill|data-name|id)' } }
                ]
              }
            }
          ]
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
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new ManifestPlugin(),
      new MomentLocalesPlugin(),
      new SuppressChunksPlugin([
        {
          name: 'style',
          match: /\.js(.map)?$/
        },
        'server'
      ]),
      new StaticSiteGeneratorPlugin({
        entry: 'server',
        locals: {
          isProduction
        },
        paths: require('./source/static-site/pages/paths')
      })
    ]
      .concat(
        // NOTE: This plugin currently makes the codebase crash when recompiling using webpack-dev-server
        isProduction ? [new webpack.optimize.ModuleConcatenationPlugin()] : []
      )
      .concat(shouldUseAnalyzer ? [new BundleAnalyzerPlugin()] : []),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: module => {
              if (module.resource && /^.*\.(css|scss)$/.test(module.resource)) {
                return false;
              }

              return module.context && module.context.includes('node_modules');
            },
            chunks: chunk => chunk.name === 'client',
            name: 'vendor'
          }
        }
      }
    }
  };
};
