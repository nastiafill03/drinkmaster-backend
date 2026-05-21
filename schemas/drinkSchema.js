const Joi = require('joi');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const addDrinkSchema = Joi.object({
  drink:        Joi.string().required().messages({ 'any.required': 'Drink name is required' }),
  description:  Joi.string().required().messages({ 'any.required': 'Description is required' }),
  category:     Joi.string().required().messages({ 'any.required': 'Category is required' }),
  glass:        Joi.string().required().messages({ 'any.required': 'Glass type is required' }),
  alcoholic:    Joi.string().valid('Alcoholic', 'Non alcoholic').required(),
  instructions: Joi.string().required().messages({ 'any.required': 'Instructions are required' }),
  ingredients:  Joi.array().items(
    Joi.object({
      title:   Joi.string().required(),
      measure: Joi.string().required(),
    })
  ).min(1).required().messages({ 'any.required': 'At least 1 ingredient required' }),
});


const drinkIdSchema = Joi.object({
  drinkId: Joi.string().pattern(objectIdPattern).required().messages({
    'any.required': 'drinkId is required',
    'string.pattern.base': 'drinkId must be a valid id',
  }),
});

module.exports = { addDrinkSchema, drinkIdSchema };
