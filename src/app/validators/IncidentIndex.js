const { celebrate, Segments, Joi } = require('celebrate');

const IncidentIndex = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
});

module.exports = IncidentIndex;
