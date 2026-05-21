const { Schema, model } = require('mongoose');

const drinkSchema = new Schema({
  drink:        String,
  drinkAlternate: String,
  tags:         String,
  video:        String,
  category:     String,
  IBA:          String,
  alcoholic:    String,   // 'Alcoholic' або 'Non alcoholic'
  glass:        String,
  description:  String,
  instructions: String,
  drinkThumb:   String,   // URL фото
  ingredients: [{
    title:          String,
    measure:        String,
    ingredientThumb: String,
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,  // null = коктейль з загальної БД
  },
  users: [{       // хто додав до улюблених
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { versionKey: false, timestamps: true });

const Drink = model('Drink', drinkSchema);
module.exports = Drink;
