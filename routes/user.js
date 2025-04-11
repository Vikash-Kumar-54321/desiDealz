const express=require("express")
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const router=express.Router();
const userController=require('../controllers/user')

router.get("/signup",(req,res)=>{
    res.render("users/signup")
})
router.post("/signup",wrapAsync(userController.userSignup))
router.get("/login",userController.renderLogin)
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/user/login",failureFlash:true}),wrapAsync(userController.login))
router.get("/logout",userController.logout)

module.exports=router;