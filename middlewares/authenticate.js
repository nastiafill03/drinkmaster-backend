const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const HttpError = require('../helpers/HttpError');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw HttpError(401, 'Not authorized');
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user || user.token !== token) {
      throw HttpError(401, 'Not authorized');
    }

    req.user = user; // додаємо юзера до запиту
    next();
  } catch (err) {
    next(HttpError(401, 'Not authorized'));
  }
};

module.exports = authenticate;
