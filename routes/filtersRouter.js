const express = require('express');
const router = express.Router();
const filtersController = require('../controllers/filtersController');
const authenticate = require('../middlewares/authenticate');

router.get('/categories', authenticate, filtersController.getCategories);
router.get('/ingredients', authenticate, filtersController.getIngredients);
router.get('/glasses', authenticate, filtersController.getGlasses);

module.exports = router;
