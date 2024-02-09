const express=require('express')
const { createNews, getAllNews, getNews, getNewsByGenre, latestNews, getNewsByTag}=require('../controllers/newsController')
const authorizeMiddleware = require('../middlewares/authorize')


const route=express.Router()

route.post('/',authorizeMiddleware,createNews)
route.get('/all',getAllNews)
route.get('/l',latestNews)
route.get('/',authorizeMiddleware,getNews)
route.get('/genre/:genre',getNewsByGenre)
route.get('/latest',latestNews)
route.get('/search/:tag',getNewsByTag)

module.exports=route