const express=require("express")
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync")
const {reviewSchema}=require("../schema")
const ExpressError=require("../utils/ExpressError")
const { isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController=require('../controllers/review')

const validateReview=(req,res,next)=>{
    let {error} =reviewSchema.validate(req.body)
        if(error){
            throw new ExpressError(400,error)
        }
        else{
            next();
        }
}

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.addReview))
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,reviewController.deleteReview)

module.exports=router