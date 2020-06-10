const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/galeria.html',
      filename: './galeria.html'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/proyectos.html',
      filename: './proyectos.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets/' }
      ],
    }),
    new OfflinePlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname,
            'node_modules',
            '@barba',
            'core',
            'animejs')
        ],
      },

      {
        test: /\.s(a|c)ss$/i,
        exclude: /styles\.s(a|c)ss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },

      {
        test: /styles\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]

      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      },
    ]
  }
};