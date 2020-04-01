const { celebrate, Segments, Joi } = require('celebrate');

const OngStore = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    whatsapp: Joi.string()
      .regex(/^\d{2}\d{5}\d{4}$/)
      .required(),
    city: Joi.string().required(),
    uf: Joi.string().length(2).required(),
  }),
});

module.exports = OngStore;
