const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.handleErrors();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  handleErrors() {
    this.server.use(errors());
  }
}

module.exports = new App().server;
