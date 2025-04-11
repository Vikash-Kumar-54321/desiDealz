const User=require('../models/user')
module.exports.userSignup=async(req,res)=>{
    try{
        let {username,email,password}=req.body
        const user=new User({username,email})
        const register=await User.register(user,password)
        req.login(register,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success","welcome to wanderlust")
        res.redirect("/product")
        })
    }catch(err){
        req.flash("error",err.message)
        res.redirect("/user/signup")
    }
}
module.exports.renderLogin=(req,res)=>{
    res.render("users/login")
}
module.exports.login=async(req,res)=>{
    req.flash("success","Logged in")
    let redirect=res.locals.redirectUrl || "/product"
    res.redirect(redirect)
}
module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
        if(err){
            next(err)
        }else{
            req.flash("success","logout successfully")
            res.redirect("/product")
        }
    })
}