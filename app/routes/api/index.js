const express = require('express');
const router = express.Router();
const content = require('app/content/parse');

// endpoint: api/projects
router.use('/projects', require('./projects'));

// endpoint: api/auth
router.use('/auth', require('./auth'));

// endpoint: api/about
router.get('/about', (req, res) => {
  const about = content.getFile('about.yaml');
  res.json(about);
});

router.use('*', (req, res) => {
  res.status(404).json({
    error: 'Resource not found'
  })
});

/**
 * Error handling
 * - Generic messages for common errors
 */
// router.use((err, req, res, next) => {
//   if (err.status === 404) {
//     err.message = 'Resource not found';
//   }
//   if (err.status === 500) {
//     err.message = 'Internal server error';
//   }
//   next(err);
// });

module.exports = router;
