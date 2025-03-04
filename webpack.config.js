const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
module.exports = {
  target: 'web',
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'main.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    liveReload: true,
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      favicon: path.resolve('src', 'assets', 'scissors.svg')
    }),
    new CopyWebPackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, 'dist', 'src', 'assets')
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: "defaults" }]],
          },
        },
        exclude: '/node_modules',
      },
    ],
  },
}