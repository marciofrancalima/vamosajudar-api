const { Router } = require('express');

const OngController = require('./app/controllers/OngController');
const IncidentController = require('./app/controllers/IncidentController');
const SessionController = require('./app/controllers/SessionController');
const ProfileController = require('./app/controllers/ProfileController');

const routes = new Router();

// SESSION
routes.post('/sessions', SessionController.store);

// PROFILE
routes.get('/profile', ProfileController.index);

//  ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

// INCIDENTS
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.destroy);

module.exports = routes;
