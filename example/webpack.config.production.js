const path = require('path');
const webpack = require('webpack');
const ComponentResolverPlugin = require('component-resolver-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, '..', 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&!postcss!sass?outputStyle=expanded'
        )
      }
    ]
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src'),
      components: path.join(__dirname, 'src', 'components'),
      containers: path.join(__dirname, 'src', 'containers'),
      actions: path.join(__dirname, 'src', 'actions'),
      constants: path.join(__dirname, 'src', 'constants'),
      reducers: path.join(__dirname, 'src', 'reducers')
    }
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin('index.css'),
    new webpack.ResolverPlugin([
      new ComponentResolverPlugin()
    ]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  ]
};
