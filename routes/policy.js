const express=require("express")
const router=express.Router();

router.get("/privacy",(req,res)=>{
    res.render("policy/privacy")
})
router.get("/term",(req,res)=>{
    res.render("policy/terms")
})

module.exports=router;