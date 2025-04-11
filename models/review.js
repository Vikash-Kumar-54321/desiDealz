const mongoose=require("mongoose")

let reviewSchema=new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    created_at:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

let Review=mongoose.model("Review",reviewSchema)
module.exports=Review;