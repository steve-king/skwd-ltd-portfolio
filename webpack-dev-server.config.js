const webpackConfig = require('./webpack.config.js');

// const proxy = {};
// proxy['/index'] = {
//   // target: 'http://localhost:5000',
//   // ignorePath: true,
//   // toProxy: '/'
// };

// proxy['/_www'] = {
//   target: 'http://localhost:8080',
//   // secure: false,
//   // bypass: function(req, res, proxyOptions) {
//   //   console.log(req.)
//   //   if (req.headers.accept.indexOf('html') !== -1) {
//   //     console.log('Skipping proxy for browser request.');
//   //     return false;
//   //   }
//   // }
//   // toProxy: false,
//   // ignorePath: true,
// };

module.exports = Object.assign({}, webpackConfig, {
  // devServer: {
  //   proxy
  // }
});
