const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
  
    "name":{type:String,required:true},
    "password":{type:String,required:true},
    
    "username":{type:String,required:true,unique:true,lowercase:true},
    "email":{type:String,required:true,unique:true,lowercase:true},
    "phoneNumber":{type:String,unique:true,maxLength:10},

    'profile':{type: String},
    "location":{type:String},

    "role":{type:String,required:true,enum:["publisher","user"]},
})
module.exports=mongoose.model('User',UserSchema)