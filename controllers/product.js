const Product=require("../models/product")

module.exports.renderProduct=async(req,res)=>{
    let products=await Product.find({})
    res.render("product/home",{products})
    
}
module.exports.renderNew=async(req,res)=>{
    res.render("product/new")
}
module.exports.newProduct=async(req,res,next)=>{
    let url=req.file.path
    let filename=req.file.filename
    let {title,description,price,location,category}= req.body
let product=new Product({
    title,
    description,
    image:{
        url,filename
    },
    price,
    location,
    category,
    owner:req.user._id,
    })
await product.save()
req.flash("success","new product created")
res.redirect("/product")
}
module.exports.showProduct=async(req,res)=>{
let {id} =req.params
let data=await Product.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner")
res.render("product/show",{data})
}
module.exports.renderEditProduct=async(req,res)=>{
let {id} =req.params
let data=await Product.findById(id)
let imageUrl=data.image.url
imageUrl=imageUrl.replace("/upload","/upload/q_60")
res.render("product/edit",{data,imageUrl})
}
module.exports.editProduct=async(req,res)=>{
    let {id} =req.params
    let {title,description,price,location,category}= req.body
    let product=await Product.findByIdAndUpdate(id,{title,
        description,
        price,
        location,category})

        if(typeof req.file !== "undefined"){
            let url=req.file.path
            let filename=req.file.filename
            product.image={
                url,filename
            }
            await listing.save();
        }
        req.flash("success","product edited")
    res.redirect(`/product/${id}`)
    }
module.exports.deleteProduct=async(req,res)=>{
    let {id} =req.params
    await Product.findByIdAndDelete(id)
    req.flash("success","product created deleted")
    res.redirect("/product")
    }