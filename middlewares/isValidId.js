const { isValidObjectId } = require('mongoose');
const HttpError = require('../helpers/HttpError');

const isValidId = (req, res, next) => {
  const { drinkId } = req.params;
  if (!isValidObjectId(drinkId)) {
    return next(HttpError(400, `${drinkId} is not a valid id`));
  }
  next();
};

module.exports = isValidId;
