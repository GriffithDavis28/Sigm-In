const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    const authHeader = req.headres("authorization");
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, "Example_SecretKEY", (err, user ) => {

        if(err) {
            return res.sendStatus(403);
        }
        req.user= user;
        next();
    })
}

function generateToken(username){

    return jwt.sign({ data: username }, "Example_SecretKEY", {
        expiresIn: "2h"
    });
}

module.exports = {
    authenticateToken,
    generateToken,
};