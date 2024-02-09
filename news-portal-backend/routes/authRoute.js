const express=require('express')
const {login, register, adminRegister}=require('../controllers/authConrtoller')
const route=express.Router()

route.post('/register',register)
route.post('/publisher/register',adminRegister)
route.post('/',login)

module.exports=route