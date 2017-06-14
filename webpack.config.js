var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');

var resources = __dirname + '/app/resources';

module.exports = {
  entry: [
    path.join(resources, 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: [
          /\.js$/, /\.jsx$/
        ],
        exclude: /node_modules/,
        // loaders: ['react-hot-loader', 'babel-loader', 'eslint-loader']
      },
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: 'css-loader'
      //       }, {
      //         loader: 'postcss-loader'
      //       }, {
      //         loader: 'svg-fill-loader/encodeSharp'
      //       }, {
      //         loader: 'sass-loader',
      //         options: {
      //           importer: nodeSassJsonImporter
      //         }
      //       }
      //     ]
      //   })
      // }, {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // }, {
      //   test: [
      //     /\.png$/, /\.jpg$/, /\.gif$/
      //   ],
      //   loader: 'file-loader',
      //   query: {
      //     context: './src/',
      //     name: 'assets/img/[name].[ext]'
      //   }
      // }, {
      //   test: [
      //     /\.woff/, /\.woff2/, /\.eot/, /\.ttf/
      //   ],
      //   loader: 'file-loader',
      //   query: {
      //     context: './src/',
      //     name: 'assets/fonts/[name].[ext]'
      //   }
      // }, {
      //   test: /\.svg$/,
      //   resourceQuery: /^\?raw/,
      //   loaders: ['raw-loader']
      // }, {
      //   test: /\.svg$/,
      //   resourceQuery: /^\?fill=/,
      //   use: ['url-loader', 'svg-fill-loader']
      // }, {
      //   test: /\.svg$/,
      //   resourceQuery: /^\?nofill/,
      //   loaders: ['url-loader']
      // }
    ]
  },
  plugins: [],
  devtool: 'source-map',
  resolve: {
    modules: [
      resources,
      'node_modules'
    ],
    extensions: [
      '.js', '.jsx'
    ]
  }
};
