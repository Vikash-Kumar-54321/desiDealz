const mongoose=require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema)
