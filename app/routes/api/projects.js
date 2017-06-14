const express = require('express');
const router = express.Router();
const content = require('content/parse');

// api/projects
router.get('/', (req, res) => {
  const projects = content.getFolder('projects', true);

  // TODO: auth check and filter private projects if necessary

  // In date order
  projects.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const formattedList = projects.map((item) => {
    const project = {
      slug: item.name,
      title: item.title
    }
    return project;
  });

  res.json(formattedList);
});

// api/projects/:slug
router.get('/:slug', (req, res) => {
  const project = content.getFolder('projects/' + req.params.slug);

  // TODO: auth check

  res.json(project);
});

module.exports = router;
