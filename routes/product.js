const express=require("express")
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync")
const {productSchema}=require("../schema")
const ExpressError=require("../utils/ExpressError")
const {isLoggedIn, isOwner}=require("../middleware")
const productController=require("../controllers/product")
const multer=require("multer")
const path = require("path");
const {storage}=require("../cloudConfig")
const upload = multer({storage});

const validateProduct=(req,res,next)=>{
    let {error} =productSchema.validate(req.body)
        if(error){
            throw new ExpressError(400,error)
        }
        else{
            next();
        }
}

router.get("/",wrapAsync(productController.renderProduct))

router.get("/new",isLoggedIn,productController.renderNew)
router.post("/new",isLoggedIn,upload.single('image'),validateProduct,wrapAsync(productController.newProduct))

router.get("/:id",wrapAsync(productController.showProduct))
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(productController.renderEditProduct))

router.put("/:id/edit",upload.single('image'),isOwner,validateProduct,wrapAsync(productController.editProduct))

router.delete("/:id/delete",isOwner,isLoggedIn,wrapAsync(productController.deleteProduct))

module.exports=router;