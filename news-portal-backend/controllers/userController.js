const User=require('../models/user')
const jwt =require('jsonwebtoken')
 const CustomError = require('../errorHandlers/customError')


const getUser = async (req, res, next) => {
    const userReq = req.body.username 
    try {
        const {email,username,role,name,profile,_id,phoneNumber,location}  = await User.findOne({ username: userReq })
        const user={email,username,role,name,profile,_id,phoneNumber,location} 
        if (!user)
            next(new CustomError('user not available', 404))
        res.status(200).json(user)
    } catch (error) {
        next(new CustomError(error, 500))
    }
}


const getPublishersName = async (req, res, next) => {
    try {
        const users = await User.find({ role: "publisher" });

        if (!users || users.length === 0) {
            return next(new CustomError('No publishers found', 404));
        }

        const publishers = users.map(user => ({ username: user.username, name: user.name,profile: user.profile }));
        res.status(200).json(publishers);
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};
const getUserById = async (req, res, next) => {
    id=req.params.id
    try {
        const {email,username,name,profile} = await User.findOne({_id:id});
        const users={email,username,name,profile}
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json('error');
        // next(new CustomError(error.message, 500));
    }
};

const updateUser=async (req,res,next)=>{
    try{
        const userDetail=req.body.user
        const updateDetail=req.body.update

        const result=await User.findOneAndUpdate(userDetail,updateDetail,{new:true})
        if(!result)
        next(new CustomError (`cannot update... doesnt exist`,400))
        else
        res.status(200).json('success')    
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports={getUserById,getUser,getPublishersName,updateUser}