const express=require("express")
const mongoose=require("mongoose")
const cookieParser=require("cookie-parser")
const profileRoute=require("./routes/profileRoute")
const authRouter = require("./routes/authRoutes")
let app=express()

//register template engine(setting view engine as template engine(ejs))
app.set("view engine","ejs")

//database connection
async function db(){
await mongoose.connect("mongodb://127.0.0.1:27017/authDB")
console.log("db connected");
}
db()


//middleware
app.use(express.urlencoded({extended:false}))//to get the form data in body

//middleware cookie
app.use(cookieParser())// use to parse(convert string into object form) the cookie

//router connection for app
app.use("/auth",authRouter)
app.use("/profile",profileRoute)

//server creation
app.listen(5000,()=>{
    console.log("server is running on the port 5000....");
})


//cookie
// app.get("/setcookie",(req,res)=>{
//     res.cookie("Name","Rachana",{
//         maxAge:24*60*60*1000,
//         httpOnly:true,
//         secure:true
//     })
//     res.send("cookie set")
// })

// app.get("/getcookie",(req,res)=>{
//     res.send(req.cookies)
// })
// app.get("/deletecookie",(req,res)=>{
// // res.clearCookie("Name")
// res.cookie("Name","",{
//     maxAge:50000
// })
// res.send("cookie deleted")
// })