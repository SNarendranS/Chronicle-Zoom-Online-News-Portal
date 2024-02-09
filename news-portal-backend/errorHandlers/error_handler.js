const CustomError  = require("./customError")



const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    console.error(err);

    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;




