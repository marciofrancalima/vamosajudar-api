const { Router } = require('express');

const OngController = require('./app/controllers/OngController');
const IncidentController = require('./app/controllers/IncidentController');
const SessionController = require('./app/controllers/SessionController');
const ProfileController = require('./app/controllers/ProfileController');

const SessionStoreValidator = require('./app/validators/SessionStore');
const OngStoreValidator = require('./app/validators/OngStore');
const ProfileIndexValidador = require('./app/validators/ProfileIndex');
const IncidentIndexValidador = require('./app/validators/IncidentIndex');
const IncidentStoreValidador = require('./app/validators/IncidentStore');
const IncidentDeleteValidador = require('./app/validators/IncidentDelete');

const routes = new Router();

// SESSION
routes.post('/sessions', SessionStoreValidator, SessionController.store);

// PROFILE
routes.get('/profile', ProfileIndexValidador, ProfileController.index);

//  ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngStoreValidator, OngController.store);

// INCIDENTS
routes.get('/incidents', IncidentIndexValidador, IncidentController.index);
routes.post('/incidents', IncidentStoreValidador, IncidentController.store);
routes.delete(
  '/incidents/:id',
  IncidentDeleteValidador,
  IncidentController.destroy
);

module.exports = routes;
