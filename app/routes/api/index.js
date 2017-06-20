const express = require('express');
const router = express.Router();
const content = require('app/content/parse');

// endpoint: api/projects
router.use('/projects', require('./projects'));

// endpoint: api/auth
router.use('/auth', require('./auth'));

// endpoint: api/about
router.get('/pages/:slug', (req, res) => {
  const about = content.getFile(`pages/${req.params.slug}.yaml`);
  res.json(about);
});

router.use('*', (req, res) => {
  res.status(404).json({
    error: 'Resource not found'
  })
});

module.exports = router;
