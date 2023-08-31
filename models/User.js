const {Schema,model}=require("mongoose")

let userSchema=new Schema({
    name:{
        type:String,
        required:true,//used to 
        trim:true//trim used to trim the spaces
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
},
{
    timestamps:true
}
)
module.exports=model("User",userSchema)