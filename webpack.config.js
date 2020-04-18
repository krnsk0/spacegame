const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const base = (options) => {
  return {
    entry: ['./src/index.js', ...options.entry],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      ...options.output,
    },
    mode: options.mode,
    stats: 'minimal',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' },
        },
        ...options.module.rules,
      ],
    },
    plugins: [new CleanWebpackPlugin(), ...options.plugins],
    optimization: {
      ...options.optimization,
    },
    performance: {
      hints: false,
    },
    devtool: options.devtool,
    devServer: options.devServer,
    resolve: {
      alias: {},
    },
  };
};

const production = {
  entry: [],
  output: [],
  mode: 'production',
  module: { rules: [] },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  optimization: {
    minimize: true,
  },
  devtool: false,
  devServer: {},
};

const development = {
  entry: [],
  output: [],
  mode: 'development',
  module: { rules: [] },
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  optimization: {},
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    overlay: { errors: true, warnings: true },
  },
};

module.exports = base(
  process.env.NODE_ENV === 'production' ? production : development
);
