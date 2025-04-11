const Product=require('../models/product')
module.exports.category=async(req, res) => {
    const categoryName = req.query.name;
    const matchedProduct = await Product.find({ category: categoryName });
    res.render("product/category", { products: matchedProduct });
  }