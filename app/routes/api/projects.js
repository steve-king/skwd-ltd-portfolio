const express = require('express');
const router = express.Router();
const content = require('app/content/parse');
const AccessToken = require('app/utils/access-token');

// PROJECTS API
// ------------------------------------------------------

/**
 * Projects list
 * endpoint: api/projects
 */
router.get('/',
  (req, res) => {
    // Get the list of projects
    var projectList = content.getFolder('projects', true);

    // Auth check
    let authorised = false;
    try { authorised = AccessToken.authenticate(req.get('Authorization')) }
    catch (err) { /* Should we notify user login has expired? */  }

    if (!authorised) {
      // Filter out any private projects
      projectList = projectList.filter(project => {
        return !project.private;
      });
    }

    // In date order
    projectList.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // Map just the fields we need to send back
    const projects = projectList.map((item) => {
      const project = {
        slug: item.name,
        title: item.title,
        private: item.private,
      }
      return project;
    });

    res.json({
      projects,
    });
  }
);

/**
 * Single project
 * endpoint: api/projects/:slug
 */
router.get('/:slug',
  (req, res, next) => {

    let project;

    // Get the project
    try { project = content.getFolder('projects/' + req.params.slug); }
    catch (err) { res.status(404).send(); }

    // Auth check if project is marked as 'private'
    if (project.private) {
      try { AccessToken.authenticate(req.get('Authorization')) }
      catch (err) { return res.status(401).send({ error: err.message }); }
    }

    res.json(project);
  }
);

module.exports = router;
