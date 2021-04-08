const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',{
                "targets": {"chrome": "55"}
              }],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ]
          }
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: "local",
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              sourceMap: true
            }
          },
          {loader: 'less-loader', options: {sourceMap: true}}
        ],
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'public/index.html'
  })],
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', 'less', 'css']
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: true, // open page when start
    // watchContentBase: true,
  },
};
