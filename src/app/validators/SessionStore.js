const { celebrate, Segments, Joi } = require('celebrate');

const SessionStore = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

module.exports = SessionStore;
