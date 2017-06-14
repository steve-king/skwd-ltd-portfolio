const express = require('express');
const router = express.Router();
const content = require('content/parse');

// api/projects
router.use('/projects', require('./projects'));

// api/about
router.get('/about', (req, res) => {
  const about = content.getFile('about.yaml');
  res.json(about);
});

module.exports = router;
