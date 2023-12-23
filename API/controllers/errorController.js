const AppError = require("../Utils/appError");

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`;

    return new AppError(message, 400);
}

const handleDuplicateFieldsError = err =>{
    const value = err.errmsg.match(/(?<=")(?:\\.|[^"\\])*(?=")/);
    const message = `Duplicate field values ${value}. Please use another name.`;
    return new AppError(message, 400);
}

const handleValidateError = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;

    return new AppError(message, 400);
}

const handleJWTError =() => new AppError("Invalid token, please log in again", 401);

const handleTokenExpiredError = () => new AppError("Your token got expired, please login again", 401)

const sendErrorDev = (err, res)=> {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
}

const sendErrorPro = (err, res)=> {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else{
        res.status(500).json({
            status: "error",
            message: "Something went wrong."
        })
    }
    
}

module.exports = (err, req, res, next)=> {
    // console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === "development"){
        sendErrorDev(err, res);
        
    } else if (process.env.NODE_ENV === "production"){

        let error = {...err};
        if(error.name === "CastError") error = handleCastError(error);
        if (error.code === 11000) error = handleDuplicateFieldsError(error)
        if(error.name === "ValidationError") error = handleValidateError(error);
        if(error.name === 'JsonWebTokenError') error = handleJWTError();
        if(error.name === "TokenExpiredError") error = handleTokenExpiredError();
        sendErrorPro(error, res); 
    }

    
    next()
}