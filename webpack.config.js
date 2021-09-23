/* eslint-disable  */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const lodash = require('lodash')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

function getAppConfig(env) {
  let data = require(`./src/configs/${env}`)
  const defaultData = require('./src/configs/default')

  data = lodash.assign(defaultData, data)

  return {
    ...data,
    ENV: env
  }
}

module.exports = (env) => {
  const NODE_ENV = (env && env.NODE_ENV) || 'development'
  const IS_DEV = NODE_ENV === 'local'
  const appConfigs = getAppConfig(NODE_ENV)

  process.env.NODE_ENV = NODE_ENV

  console.log('Node ENV: %s', NODE_ENV)

  return {
    devtool: IS_DEV ? 'eval-cheap-module-source-map' : false,
    target: IS_DEV ? 'web' : 'browserslist',
    entry: path.resolve(__dirname, IS_DEV ? 'src/index.dev.js' : 'src'),
    output: {
      filename: '[name][fullhash].js',
      chunkFilename: '[name][fullhash].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: appConfigs.PUBLIC_PATH
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    module: {
      rules: [{
        test: /\.(ts|tsx|jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }, {
        test: /\.less$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          }
        ]
      }, {
        test: /\.css$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: !IS_DEV,
            root: path.resolve(__dirname, 'src')
          }
        }]
      }, {
        test: /\.(jpg|jpeg|png|svg|woff|eot|ttf|otf|pdf|gif)$/,
        use: ['file-loader']
      }, {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: appConfigs.TITLE,
        template: path.resolve(__dirname, 'src/index.ejs'),
        favicon: path.resolve(__dirname, 'src/resources/images/favicon.ico'),
        templateParameters: {
          language: appConfigs.PAGE_LANGUAGE
        }
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'window._CONFIG': JSON.stringify(appConfigs),
      }),
      new CopyPlugin({
        patterns: [{
          from: path.join(__dirname, 'public'),
          to: path.join(__dirname, 'build')
        }]
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      port: 3000,
      hot: true,
      open: true,
      client: {
        overlay: true,
        logging: 'warn'
      },
      historyApiFallback: true
    },
    stats: 'minimal',
    mode: IS_DEV ? 'development' : 'production'
  }
}
