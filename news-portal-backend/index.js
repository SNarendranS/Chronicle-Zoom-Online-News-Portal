const express=require('express')
const fs = require('fs');
const cors=require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()

const errorHandler=require('./errorHandlers/error_handler')
const database=require("./utils/database")

const AuthRoute=require('./routes/authRoute.js')
const UserRoute=require('./routes/userRoute.js')
const NewsRoute=require('./routes/newsRoute.js')
const CommentRoute=require('./routes/commentRoute.js')
const adsRoute=require('./routes/adsRoute.js')

const app=express()

app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/news',NewsRoute)
app.use('/comment',CommentRoute)
app.use('/ads',adsRoute)
app.use(errorHandler)

const start=async()=>{
    try{
        const connect=await database()
        app.listen(8080,()=>{
            console.log('server is listening...')
        })
    }catch(error){
        console.log(error)
    }

}
start()