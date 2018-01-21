const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const outputDir = path.join(__dirname, 'build')

module.exports = (env) => {
  const config = {
    devtool: 'source-map',
    entry: {
      main: [
        './src/index.js',
      ],
    },
    output: {
      path: outputDir,
      filename: '[name].js',
      libraryTarget: 'umd',
      publicPath: '/',
    },
    devServer: {
      contentBase: outputDir,
      historyApiFallback: true,
      watchContentBase: true,
      open: true,
      compress: true,
      port: 9000,
    },
    resolve: {
      alias: {
        app: path.resolve(__dirname, 'src/'),
      },
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react'],
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([outputDir]),
      new CopyWebpackPlugin([
        { context: 'public/', from: '**/*', to: outputDir },
      ]),
    ],
  }
  return config
}