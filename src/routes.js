const { Router } = require('express');

const OngController = require('./app/controllers/OngController');

const routes = new Router();

//  ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

module.exports = routes;
