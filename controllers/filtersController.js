const Drink = require('../models/drinkModel');
const Ingredient = require('../models/ingredients');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Drink.distinct('category');
    res.status(200).json(categories.sort());
  } catch (err) { next(err); }
};

const getIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find({}, 'title ingredientThumb');
    res.status(200).json(ingredients);
  } catch (err) { next(err); }
};

const getGlasses = async (req, res, next) => {
  try {
    const glasses = await Drink.distinct('glass');
    res.status(200).json(glasses.sort());
  } catch (err) { next(err); }
};

module.exports = { getCategories, getIngredients, getGlasses };
