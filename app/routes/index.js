const express = require('express');
const router = express.Router();
const content = require('app/content/parse');

router.use('/_www', express.static(process.cwd() + '/_www'));
router.use('/api', require('./api'));

/**
 * Index route
 * -----------
 * Serve the main HTML template for the React frontend.
 * All unmatched routes point here and will be handled by the React frontend.
 */
router.use((req, res) => {
  const meta = content.getFile('meta.yaml');
  res.render('index.html', { meta });
});

module.exports = router;
