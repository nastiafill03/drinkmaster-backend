const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');
const authenticate = require('../middlewares/authenticate');
const validateBody = require('../middlewares/validateBody');

const { signupSchema, signinSchema } = require('../schemas/authSchemas');

router.post('/signup', validateBody(signupSchema), authController.signup);
router.post('/signin', validateBody(signinSchema), authController.signin);
router.post('/signout', authenticate, authController.signout);

module.exports = router;
