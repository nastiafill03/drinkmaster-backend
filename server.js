require('dotenv').config({ path: __dirname + '/.env' });

const mongoose = require('mongoose');
const app = require('./app');

const { PORT = 3001, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB підключена успішно');
    app.listen(PORT, () => {
      console.log(`Сервер запущено: http://localhost:${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Помилка підключення до MongoDB:', err.message);
    process.exit(1);
  });
