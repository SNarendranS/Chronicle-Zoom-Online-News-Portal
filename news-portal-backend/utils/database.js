const mongoose=require('mongoose')
const connnectDB=()=>{return mongoose.connect(process.env.MONGO_URL)}
module.exports=connnectDB