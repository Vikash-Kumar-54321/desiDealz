const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const buyController=require('../controllers/buy')

router.get('/:id/buy', isLoggedIn, buyController.buy);

module.exports = router;