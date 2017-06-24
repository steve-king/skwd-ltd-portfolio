const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

var srcDir = __dirname + '/app/public';
var publicDir = path.join(__dirname, '_www');

module.exports = {
  entry: {
    main: path.join(srcDir, 'index.js')
  },
  output: {
    publicPath: '/',
    path: publicDir,
    filename: 'assets/js/[name].js',
  },
  module: {
    loaders: [
      {
        // JS
        test: [
          /\.js$/, /\.jsx$/
        ],
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
          // 'eslint-loader' // Move to dev config
        ]
      },
      {
        // CSS
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'svg-fill-loader/encodeSharp' },
            { loader: 'sass-loader' },
          ]
        })
      },
      {
        test: [/\.png$/, /\.jpg$/, /\.gif$/],
        use: ['file-loader']
      },
      {
        test: /\.svg$/,
        use: ['url-loader', 'svg-fill-loader'],
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new ExtractTextPlugin({filename: 'assets/css/style.css', allChunks: true}),
    new CopyWebpackPlugin([
      { from: path.join(srcDir, 'assets/img'),
      to: path.join(publicDir, 'assets/img') },
      { from: path.join(srcDir, 'assets/fonts'),
      to: path.join(publicDir, 'assets/fonts') }
    ]),
    new ImageminPlugin({
      //disable: process.env.NODE_ENV !== 'production', // Disable during development
      jpegtran: {
        progressive: true
      },
      pngquant: {
        quality: '95-100'
      }
    })
  ],
  devtool: 'source-map',
  resolve: {
    modules: [
      srcDir, 'node_modules'
    ],
    extensions: ['.js', '.jsx']
  }
};
