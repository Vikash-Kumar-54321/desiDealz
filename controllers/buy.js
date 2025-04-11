const Product=require('../models/product')
const Order=require('../models/order')

module.exports.buy=async (req, res) => {
    const product = await Product.findById(req.params.id);
    const order = new Order({
      user: req.user._id,
      items: [{ product: product._id, quantity: 1 }],
      total: product.price
    });
    await order.save();
  await order.populate('items.product');
  res.render('buy/show', { order });
  
  }