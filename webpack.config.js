var path = require('path');
var webpack = require('webpack');

module.exports = [{
  entry: './src/index.js',

  output: {
    filename: './dist/redux-nprogress.js',
    libraryTarget: 'umd',
    library: 'ReduxNprogress'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        path.join(__dirname, 'src')
      ]
    }]
  },

  externals: {
    react: 'react',
    redux: 'redux',
    'react-redux': 'react-redux',
    'react-dom/server': 'ReactDOMServer',
    nprogress: 'nprogress'
  }
}, {
  entry: './src/index.js',

  output: {
    filename: './dist/redux-nprogress.min.js',
    libraryTarget: 'umd',
    library: 'ReduxNprogress'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        path.join(__dirname, 'src') // Must be an absolute path
      ]
    }]
  },

  externals: {
    react: 'react',
    redux: 'redux',
    'react-redux': 'react-redux',
    'react-dom/server': 'ReactDOMServer',
    nprogress: 'nprogress'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
}];
