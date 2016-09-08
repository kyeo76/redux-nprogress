const path = require('path');
const webpack = require('webpack');
const ComponentResolverPlugin = require('component-resolver-webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src', 'index')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
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
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass'
        ]
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
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.ResolverPlugin([
      new ComponentResolverPlugin()
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  ],
};
