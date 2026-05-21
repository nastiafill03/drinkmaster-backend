const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');
const validateBody = require('../middlewares/validateBody');
const HttpError = require('../helpers/HttpError');
const { updateUserSchema, subscribeSchema } = require('../schemas/userSchemas');

const validateUserUpdate = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body ?? {});
  const hasBodyFields = Object.keys(req.body ?? {}).length > 0;
  if (error && (!req.file || hasBodyFields)) {
    return next(HttpError(400, error.message));
  }
  next();
};

router.get('/current', authenticate, usersController.getCurrent);
router.patch('/update', authenticate, upload.single('avatar'), validateUserUpdate, usersController.update);
router.post('/subscribe', authenticate, validateBody(subscribeSchema), usersController.subscribe);

module.exports = router;
