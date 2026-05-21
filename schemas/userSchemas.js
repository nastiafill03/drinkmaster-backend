const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(32),
  birthDate: Joi.string(),
}).min(1).messages({ 'object.min': 'At least one field required' });

const subscribeSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid',
    'any.required': 'Email is required',
  }),
});

module.exports = { updateUserSchema, subscribeSchema };
