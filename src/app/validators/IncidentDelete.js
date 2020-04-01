const { celebrate, Segments, Joi } = require('celebrate');

const IncidentDelete = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

module.exports = IncidentDelete;
