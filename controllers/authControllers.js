const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const HttpError = require('../helpers/HttpError');
require('dotenv').config();

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) throw HttpError(409, 'Email already in use');

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      token,
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    next(err);
  }
};


const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, 'Email or password invalid');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw HttpError(401, 'Email or password invalid');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
        birthDate: user.birthDate,
      },
    });
  } catch (err) {
    next(err);
  }
};

const signout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin, signout };
