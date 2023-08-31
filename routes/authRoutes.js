//router instance
const express=require("express");
const { postSignup, getLogin, getSignup, postLogin } = require("../controllers/authController");
let authRouter=express.Router()//middleware as router

//login
authRouter.get("/login",getLogin)
authRouter.post("/login",postLogin)


//signup
authRouter.get("/signup",getSignup)
authRouter.post("/signup",postSignup)
module.exports=authRouter;