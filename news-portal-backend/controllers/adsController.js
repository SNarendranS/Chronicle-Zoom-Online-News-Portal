const User = require('../models/user');
const Ads = require('../models/ads');
const CustomError = require('../errorHandlers/error_handler');

const getADS = async (req, res, next) => {
    const id = req.body.id; 
    try {
        const allAds = await Ads.find();
        res.status(200).json(allAds);
    } catch (error) {
        console.error('Error fetching ads:', error);
        res.status(500).json({ error: 'Failed to fetch ads' });
    }
};

const postADS = async (req, res, next) => {
    const user = req.user;
    const adsInfo = req.body;

    try {
        const userDetail = await User.findOne({ email: user.email });
        adsInfo.publisher = userDetail._id;


        const currentDate = new Date();
        const expirationDate = new Date(currentDate);
        expirationDate.setDate(expirationDate.getDate() + adsInfo.expiryDay);
        adsInfo.expirationDate = expirationDate;

        const AD = await Ads.create(adsInfo);
        res.status(200).json(AD);
    } catch (error) {
        console.error('Error posting ads:', error);
        res.status(500).json({ error: 'Failed to post ads' });
    }
};


module.exports = { postADS, getADS };
