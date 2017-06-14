const express = require('express');
const router = express.Router();
const content = require('content/parse');

/**
 * Static assets
 * -------------
 */
router.use('/public', express.static(process.cwd() + '/public'));
router.use('/api', require('./api'));

/**
 * Index route
 * -----------
 * Serve the main HTML template for the React frontend.
 * Include things to be rendered on page such as meta title/description
 */
router.get('/', (req, res) => {
  const meta = content.getFile('meta.yaml');
  res.render('index.html', { meta });
});

 /**
  * AUTH API
  * -----------
  */
module.exports = router;
