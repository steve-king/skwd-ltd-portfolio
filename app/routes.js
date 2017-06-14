const express = require('express');
const router = express.Router();

const content = require('./content/parse');
// console.log('CONTENT', content.getFolder('projects'));

/**
 * Static assets
 * -------------
 */
router.use('/public', express.static(process.cwd() + '/public'));

/**
 * Index route
 * -----------
 * Serve the main HTML template for the React frontend.
 * Include things to be rendered on page such as meta title/description
 */
router.get('/', (req, res) => {
  const meta = content.getFile('meta.yaml');
  res.render('index.html', {
    meta
  });
});

/**
 * Content API
 * -----------
 * Serve content from projects and other pages in JSON format
 */

 /**
  * AUTH API
  * -----------
  */


module.exports = router;
