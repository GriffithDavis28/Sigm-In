

function errorHandler(err, req, res, next) {
    if(typeof err == "string") {
        return res.sendStatus(400),json({message: err});
    }

    if(typeof err == "ValidateError") {
        return res.sendStatus(400),json({message: err});
    }

    if(typeof err == "UnauthorizedError") {
        return res.sendStatus(400),json({message: err});
    }
    

    return res.status(500).json({ message: err});

}


module.exports = { 
    errorHandler
};