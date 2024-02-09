const express=require('express')
const { getADS,postADS }=require('../controllers/adsController')
const authorizeMiddleware = require('../middlewares/authorize')


const route=express.Router()


route.get('/',getADS)
route.post('/post',authorizeMiddleware,postADS)
module.exports=route