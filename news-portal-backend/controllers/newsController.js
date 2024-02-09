const News=require('../models/news')
const User=require('../models/user')


const CustomError = require('../errorHandlers/error_handler')

const createNews=async (req,res,next)=>{
    const newsData=req.body
    const user=req.user
    try{
        if(user.role=='publisher'){
            const user_id=await User.findOne({"email":user.email})
        newsData.publisher=user_id
        const news=await News.create(newsData)
        res.status(200).json(news)
        }
        
    }catch(error){
        res.status(401).json(error)

  
    }
}


const getNews=async (req, res,next) => {
    const user=req.user
    try{
        const publisher=await User.findOne({email:user.email})
        const news=await News.find({publisher:publisher._id})
        res.status(200).json(news)
    }catch(error){
        res.status(500).json(error)

    }
}

const getNewsByGenre=async (req, res,next) => {
    const genre=req.params.genre
    try{
        const news=await News.find({genre:genre})
        res.status(200).json(news)
    }catch(error){
        next(new CustomError(error,500))
    }
}
const getAllNews=async (req,res,next)=>{
    try{
        const news=await News.find()
        res.status(200).json(news)
    }catch (error) {
        next(new CustomError(error,500))
    }
}
const latestNews = async (req, res, next) => {
    try {
      const news = await News.find().sort({ createAt: -1 })
      res.status(200).json(news);
    } catch (error) {
      next(new CustomError(error, 500));
    }
  };

  const getNewsByTag = async (req, res, next) => {
    const tag = req.params.tag;
    try {
      const news = await News.find({ tags: { $regex: tag, $options: 'i' } });
      res.status(200).json(news);
    } catch (error) {
      next(new CustomError(error, 500));
    }
  };  
  
module.exports={createNews,getAllNews,getNews,getNewsByGenre,latestNews,getNewsByTag}