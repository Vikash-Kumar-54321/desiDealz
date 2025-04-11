const Product=require("./models/product");
const Review = require("./models/review");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login first")
        return res.redirect("/user/login")
    }
    next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        delete req.session.redirectUrl
    }
    next()
}
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params
    let product=await Product.findById(id)
if(!product.owner._id.equals(res.locals.curUser._id )){
    req.flash("error","not authorized to do it")
    return res.redirect(`/product/${id}`)
}
next();
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params
    let review=await Review.findById(reviewId)
if(!review.author._id.equals(res.locals.curUser._id )){
    req.flash("error","not authorized to do it")
    return res.redirect(`/product/${id}`)
}
next();
}