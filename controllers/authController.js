const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const getLogin=(req,res)=>{
res.render("login")
}

const getSignup=(req,res)=>{
    res.render("signup")
    }
    const postSignup=async(req,res)=>{
        const {name,email,password}=req.body
        try {
            let existingUser=await User.findOne({email}).lean()
            if(existingUser){
                
                return res.redirect("/auth/login")
            }else{
                let saltRounds=await bcrypt.genSalt(10)
            let hashedPassword=await bcrypt.hash(password,saltRounds)
           await User.create(
            {name:name,
                email:email,
                password:hashedPassword}
            )
           res.status(201).redirect("/auth/login")
            }
            
        } catch (error) {
            console.log(error);
            res.redirect("/auth/signup")
        }
    }

    const postLogin=async(req,res)=>{
const {email,password}=req.body
try {
    const existingUser=await User.findOne({email}).lean()
    if(existingUser){
//verify password
const validUser=await bcrypt.compare(password,existingUser.password)
if(validUser){
    const token=await jwt.sign({id:existingUser._id},"SECRETE")
    res.cookie("jwt",token,{
        maxAge:24*60*60*1000,
        httpOnly:true,
        secure:true
    })
res.redirect("/profile")
}
    }
} catch (error) {
    console.log(error);
    res.redirect("/signup")
}
    }

    module.exports={
        getLogin,getSignup,postSignup,postLogin
    }