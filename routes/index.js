const routes = require('express').Router();

const controller = require('../controllers');

routes.get('/awesome', controller.awesomeFunction);
routes.get('/', controller.personIKnow);

module.exports = routes;