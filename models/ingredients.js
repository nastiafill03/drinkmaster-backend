const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
  title:           String,
  description:     String,
  ingredientThumb: String,
  type:            String,
  alcohol:         String,
  abv:             String,
}, { versionKey: false });

const Ingredient = model('Ingredient', ingredientSchema);
module.exports = Ingredient;