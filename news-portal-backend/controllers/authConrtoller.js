const User=require('../models/user')
const jwt =require('jsonwebtoken')
const CustomError = require('../errorHandlers/customError')

const login=async(req,res,next)=>{

    try {
        const user = await User.findOne({ 'username': req.body.username});
        if (!user) {
            return next(new CustomError('Invalid username!!!', 401));
        }
        const isPasswordValid = user.password===req.body.password;
        if (!isPasswordValid) {
            return next(new CustomError('Invalid password...retry!!', 401))
        }
        const {email,username,role,name} = user
 
        const token = jwt.sign({email,username,role,name}, process.env.JSON_SECRETKEY)
        res.status(200).json(token)
    }catch(error){
        next(new CustomError(error,500))
    }
}

const register=async(req,res,next)=>{
    const createUser=req.body
    try{
        createUser.role="user"
        const user=await User.create(createUser)
        res.status(200).json(user)
    }catch(error){
        next(new CustomError(error,500))
    }
}

const adminRegister=async(req,res,next)=>{
    const createUser=req.body
    createUser.role="publisher"
    try{
        const user=await User.create(createUser)
        res.status(200).json(user)
    }catch(error){
        next(new CustomError(error,500))
    }
}
module.exports={login,adminRegister,register}