const express=require('express')
const { getUser, getUserById, getPublishersName, updateUser}=require('../controllers/userController')
const authorizeMiddleware = require('../middlewares/authorize')
const route=express.Router()

route.post('/update',authorizeMiddleware,updateUser)
route.post('/username',authorizeMiddleware,getUser)
route.get('/:id',getUserById)
route.get('/',getPublishersName)
 


module.exports=route