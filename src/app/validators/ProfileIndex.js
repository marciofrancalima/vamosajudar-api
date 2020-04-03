const { celebrate, Segments, Joi } = require('celebrate');

const ProfileIndex = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.QUERY]: Joi.object({
    page: Joi.number(),
  }).unknown(),
});

module.exports = ProfileIndex;
