const express = require('express');
const router = express.Router();
const categoryController=require('../controllers/category')


router.get("/categories",categoryController.category );


module.exports = router;