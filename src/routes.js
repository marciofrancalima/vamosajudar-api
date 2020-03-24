const { Router } = require('express');

const OngController = require('./app/controllers/OngController');
const IncidentController = require('./app/controllers/IncidentController');

const routes = new Router();

//  ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

// INCIDENTS
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.destroy);

module.exports = routes;
