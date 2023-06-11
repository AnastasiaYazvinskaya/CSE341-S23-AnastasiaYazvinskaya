const routes = require('express').Router();

const controller = require('../controllers');

routes.get('/awesome', controller.awesomeFunction);
routes.get('/', controller.personIKnow);

routes.use('/contacts', require('./contacts'));

module.exports = routes;