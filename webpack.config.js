var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');

var srcDir = __dirname + '/app/public';
var publicDir = path.join(__dirname, '_www');

module.exports = {
  entry: [path.join(srcDir, 'index.js')],
  output: {
    path: publicDir,
    publicPath: '/',
    filename: 'assets/js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: [
          /\.js$/, /\.jsx$/
        ],
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            // { loader: 'svg-fill-loader/encodeSharp' },
            { loader: 'sass-loader', },
          ]
        })
      },
      {
        test: [
          /\.woff/, /\.woff2/, /\.eot/, /\.ttf/
        ],
        loader: 'file-loader',
        query: {
          // context: './src/',
          name: 'assets/fonts/[name].[ext]'
        }
      },
      // {
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
  plugins: [
    new ExtractTextPlugin({filename: 'assets/css/style.css', allChunks: true}),
    // new CopyWebpackPlugin([
    //   {
    //     from: './resources/assets/data',
    //     to: 'assets/data'
    //   },
    // ])
  ],
  devtool: 'source-map',
  resolve: {
    modules: [
      srcDir, 'node_modules'
    ],
    extensions: ['.js', '.jsx']
  }
};
