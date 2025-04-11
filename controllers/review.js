const Review=require('../models/review')
const Product=require('../models/product')
module.exports.addReview=async(req,res)=>{
    let {id}=req.params
    let product=await Product.findById(id)
    let {review}=req.body
    let newReview=new Review(review)
    newReview.author=req.user._id
    product.review.push(newReview)
    await newReview.save()
    await product.save()
    res.redirect(`/product/${product._id}`)
}
module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params
    await Product.findByIdAndUpdate(id,{$pull: {review:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/product/${id}`)
}