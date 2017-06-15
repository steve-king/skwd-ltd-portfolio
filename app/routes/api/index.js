const express = require('express');
const router = express.Router();
const content = require('content/parse');

// endpoint: api/projects
router.use('/projects', require('./projects'));

// endpoint: api/auth
router.use('/auth', require('./auth'));

// endpoint: api/about
router.get('/about', (req, res) => {
  const about = content.getFile('about.yaml');
  res.json(about);
});

/**
 * Error handling
 * - Generic messages for common errors
 */
router.use((err, req, res, next) => {
  if (err.status === 404) {
    err.message = 'Resource not found';
  }
  if (err.status === 500) {
    err.message = 'Internal server error';
  }
  res.json(err);
});

module.exports = router;
