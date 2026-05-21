require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');

const Drink = require('../models/drinkModel');
const Ingredient = require('../models/ingredients');

const drinks = require('./recipes.json');
const ingredients = require('./ingredients.json');

const normalizeMongoExport = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizeMongoExport);
  }

  if (value && typeof value === 'object') {
    if (typeof value.$oid === 'string' && Object.keys(value).length === 1) {
      return value.$oid;
    }

    if (typeof value.$date === 'string' && Object.keys(value).length === 1) {
      return new Date(value.$date);
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [
        key,
        normalizeMongoExport(entryValue),
      ])
    );
  }

  return value;
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB підключена');

    await Drink.deleteMany({ owner: null });
    console.log('Старі коктейлі видалено');

    const normalizedDrinks = normalizeMongoExport(drinks);
    await Drink.insertMany(normalizedDrinks);
    console.log(`Імпортовано ${drinks.length} коктейлів`);

    await Ingredient.deleteMany({});
    console.log('Старі інгредієнти видалено');

    const normalizedIngredients = normalizeMongoExport(ingredients);
    await Ingredient.insertMany(normalizedIngredients);
    console.log(`Імпортовано ${ingredients.length} інгредієнтів`);

  } catch (err) {
    console.error('Помилка імпорту:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log(' З\'єднання закрито');
    process.exit(0);
  }
};

importData();
