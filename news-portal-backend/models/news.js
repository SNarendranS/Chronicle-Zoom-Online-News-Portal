const mongoose=require('mongoose')
const User=require('./user')
const Comment=require('./comments')

const NewsSchema=new mongoose.Schema({
    'title':{required:true,type:String},
    'content':{required:true,type:String},
    'image':{ type: String },
    'publisher':{type:mongoose.Schema.Types.ObjectId,ref:User,required:true},
    'genre':{ type: String },
    'createAt':{type:Date,default:Date.now},
    'comments':[{type:mongoose.Schema.Types.ObjectId,ref:Comment}],
    'tags':[{type:String,lowercase:true}]
})

module.exports=mongoose.model('News',NewsSchema) 

