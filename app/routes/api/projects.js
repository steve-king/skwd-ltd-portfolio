const express = require('express');
const router = express.Router();
const content = require('content/parse');
const accessToken = require('./auth/access-token');

// PROJECTS API
// ------------------------------------------------------

/**
 * Projects list
 * endpoint: api/projects
 */
router.get('/',
  (req, res) => {
    // Get the list of projects
    var projects = content.getFolder('projects', true);

    // Auth check
    const authorised = accessToken.isValid(req);
    if (!authorised) {
      // Filter out private projects
      projects = projects.filter(project => {
        return !project.private;
      });
    }

    // In date order
    projects.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // Map just the fields we need to send back
    const formattedList = projects.map((item) => {
      const project = {
        slug: item.name,
        title: item.title
      }
      return project;
    });

    res.json({
      projects: formattedList,
    });
  }
);

/**
 * Projects list
 * endpoint: api/projects/:slug
 */
router.get('/:slug',
  (req, res, next) => {
    // Get the project
    try { req.body.project = content.getFolder('projects/' + req.params.slug); }

    // 404 if not found
    catch (err) {
      console.log(err);
      let error = new Error();
      error.status = 404;
      return next(error);
    }

    // Auth check if project is marked as 'private'
    if (req.body.project.private) {
      return accessToken.protectedResource(req, res, next);
    }

    // If public, carry on
    next();
  },
  (req, res) => {
    res.json(req.body.project);
  }
);

module.exports = router;
