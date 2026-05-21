const User = require('../models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ─── GET /users/current ──────────────────────────────────
const getCurrent = async (req, res, next) => {
  try {
    // req.user вже є завдяки authenticate middleware
    const { name, email, avatarURL, birthDate } = req.user;
    res.status(200).json({ name, email, avatarURL, birthDate });
  } catch (err) {
    next(err);
  }
};

// ─── PATCH /users/update ─────────────────────────────────
const update = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, birthDate } = req.body;

    // Збираємо тільки ті поля що прийшли
    const updateData = {};
    if (name) updateData.name = name;
    if (birthDate) updateData.birthDate = birthDate;
    // req.file є якщо юзер завантажив фото — multer вже зберіг в Cloudinary
    if (req.file) updateData.avatarURL = req.file.path;

    const updated = await User.findByIdAndUpdate(_id, updateData, { new: true });

    res.status(200).json({
      name: updated.name,
      avatarURL: updated.avatarURL,
      birthDate: updated.birthDate,
    });
  } catch (err) {
    next(err);
  }
};

// ─── POST /users/subscribe ───────────────────────────────
const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Налаштовуємо Gmail транспорт
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        // Це App Password — НЕ пароль від Gmail!
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `DrinkMaster <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to DrinkMaster! 🍹',
      html: `
        <h2>Дякуємо за підписку!</h2>
        <p>Вітаємо в DrinkMaster — найкращому місці для коктейлів.</p>
        <p>Ви будете отримувати найкращі рецепти коктейлів.</p>
      `,
    });

    res.status(200).json({ message: `${email} subscribed successfully` });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCurrent, update, subscribe };
