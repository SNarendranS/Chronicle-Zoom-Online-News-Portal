const express=require('express')
const { comments, putComment }=require('../controllers/commentsController')
const authorizeMiddleware = require('../middlewares/authorize')


const route=express.Router()


route.post('/',authorizeMiddleware,comments)
route.post('/post',authorizeMiddleware,putComment)
module.exports=route