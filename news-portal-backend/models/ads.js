const mongoose=require('mongoose')
const User=require('./user')


const ADSchema=new mongoose.Schema({
    'title':{required:true,type:String},
    'publisher':{type:mongoose.Schema.Types.ObjectId,ref:User,required:true},
    'contactName': {required:true, type: String },
    'contactPhone': {required:true, type: String ,maxLength:10},

    'content':{type:String},
    'image':{ type: String },
    'contactEmail': { type: String ,lowercase:true},
    'price': { type: Number },
    'url':{ type: String },

    'createAt':{type:Date,default:Date.now},
    'expirationDate': { type: Date }
})

module.exports=mongoose.model('ad',ADSchema) 

