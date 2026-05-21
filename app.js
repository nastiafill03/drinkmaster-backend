const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerDoc = require('./swagger/swagger.json');

const authRouter = require('./routes/authRouter');
const usersRouter = require('./routes/usersRouter');
const drinksRouter = require('./routes/drinksRouter');
const filtersRouter = require('./routes/filtersRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/drinks', drinksRouter);
app.use('/filters', filtersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
