const express=require("express")
let profileRouter=express.Router()
const {authorizeUser, checkUser}=require("../middlewares/authMiddleware")

profileRouter.get("/",authorizeUser,checkUser,(req,res)=>{
    let user=req.user
    res.render("profile",{user})
})

module.exports=profileRouter