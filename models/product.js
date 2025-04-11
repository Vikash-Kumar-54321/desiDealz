const mongoose=require("mongoose")
const Review = require("./review")

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String,
    },
    price:{
        type:Number,
        required:true,
    },
    location:String,
    review:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    category: {
        type: String,
        required: true,
        enum: ['fashion', 'footwear', 'electronics', 'kitchen','beauty','mobile','grocery'],
        lowercase: true,
        trim: true
      },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
})
productSchema.post("findOneAndDelete",async(product)=>{
    if(product){
        await Review.deleteMany({_id:{$in:product.review }})
    }
})

let Product=mongoose.model("Product",productSchema)
module.exports=Product