const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  birthDate: { type: String, default: null },
  avatarURL: { type: String, default: null },
  token:     { type: String, default: null },
}, { versionKey: false });

const User = model('User', userSchema);
module.exports = User;
