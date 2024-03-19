const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: './src/scripts/main.ts',
    form: './src/scripts/form.ts',
    user: './src/scripts/user.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        type: 'asset/resource',
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'assets/',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pages/index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'form.html',
      template: 'src/pages/form.html',
      chunks: ['form'],
    }),
    new HtmlWebpackPlugin({
      filename: 'user.html',
      template: 'src/pages/user.html',
      chunks: ['user'],
    }),
  ],
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name].[ext][query]',
  },
};
