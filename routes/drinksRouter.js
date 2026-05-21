const express = require('express');
const router = express.Router();
const drinksController = require('../controllers/drinksController');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');
const isValidId = require('../middlewares/isValidId');
const validateBody = require('../middlewares/validateBody');
const HttpError = require('../helpers/HttpError');
const { addDrinkSchema, drinkIdSchema } = require('../schemas/drinkSchema');

const parseDrinkIngredients = (req, res, next) => {
  if (typeof req.body.ingredients !== 'string') {
    return next();
  }

  try {
    req.body.ingredients = JSON.parse(req.body.ingredients);
    next();
  } catch (err) {
    next(HttpError(400, 'ingredients must be valid JSON'));
  }
};

router.get('/mainpage', authenticate, drinksController.getMainPage);
router.get('/popular', authenticate, drinksController.getPopular);
router.get('/search', authenticate, drinksController.search);

router.get('/own', authenticate, drinksController.getOwn);
router.post('/own/add', authenticate,
  upload.single('drinkThumb'), 
  parseDrinkIngredients,
  validateBody(addDrinkSchema), 
  drinksController.addOwn
);

router.delete('/own/remove', authenticate,
  validateBody(drinkIdSchema),
  drinksController.removeOwn
);


router.get('/favorite', authenticate, drinksController.getFavorite);
router.post('/favorite/add',authenticate, validateBody(drinkIdSchema), drinksController.addFavorite);
router.delete('/favorite/remove',authenticate, validateBody(drinkIdSchema), drinksController.removeFavorite);
router.get('/:drinkId', authenticate, isValidId, drinksController.getById);

module.exports = router;
