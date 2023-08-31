//authorize the user

const jwt=require("jsonwebtoken")
const User = require("../models/User")

const authorizeUser=async(req,res,next)=>{
    let token=req.cookies.jwt
   try {
    if(token){
        let decodedToken=await jwt.verify(token,"SECRETE")
        if(decodedToken){
         next()
        }else{
         res.redirect("/auth/login")
        }
     }else{
         res.redirect("/auth/login")
        }
   } catch (error) {
    res.redirect("/auth/login")

   }
}

const checkUser=async(req,res,next)=>{
    let token=req.cookies.jwt
   try {
    if(token){
        let decodedToken=await jwt.verify(token,"SECRETE")
        if(decodedToken){
            let id=decodedToken.id
            let user=await User.findById(id)
            req.user=user;
         next()
        }else{
            req.user=null
         res.redirect("/auth/login")
        }
     }else{
        req.user=null
         res.redirect("/auth/login")
        }
   } catch (error) {
    req.user=null
    res.redirect("/auth/login")

   }
}
module.exports={authorizeUser, checkUser}