const Comment=require('../models/comments')
const News=require('../models/news')
const User=require('../models/user')
const CustomError = require('../errorHandlers/error_handler')

const comments = async (req, res, next) => {
    const id = req.body.id 
    try {
        const comment= await Comment.findOne({ _id: id })
        if (!comment)
            next(new CustomError('comment not available', 404))
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json('cmt err')
    }
}
const putComment=async (req, res,next) => {
    const user=req.user
    const newsInfo=req.body
    try{
        const userDetail=await User.findOne({email:user.email})

        newsInfo.commentBy=userDetail._id
        const comment=await Comment.create(newsInfo)
        await News.findOneAndUpdate(
            { _id:newsInfo.commentTo },
            { $push: { comments: comment._id } },
            { new: true }
        );
        res.status(200).json(comment)
    }catch(error){
        res.status(500).json('failed comment')
    }

}
module.exports = { comments,putComment};
