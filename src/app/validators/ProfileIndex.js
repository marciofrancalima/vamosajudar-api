const { celebrate, Segments, Joi } = require('celebrate');

const ProfileIndex = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

module.exports = ProfileIndex;
