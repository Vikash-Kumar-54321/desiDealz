const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const cartController=require('../controllers/cart')

router.post('/product/:id/cart', isLoggedIn, cartController.addProduct);

router.get('/cart', isLoggedIn, cartController.renderCart);

router.post('/cart/checkout', isLoggedIn, cartController.checkout);

router.post('/cart/remove/:productId', isLoggedIn,cartController.removeProduct);
  

module.exports = router;