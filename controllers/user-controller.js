const bcryptjs = require('bcryptjs');
const { result } = require('lodash');
const UserService = require('../services/UserService');

exports.register = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSalt(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    UserService.register(req.body, (error, result) => {
        if(error) {
            return next(error);
        }

        return res.status(200).send({

            message: "Success",
            data: result,
        });
    });
};

exports.login = (req, res, next) => {
    const { uername, password} = req.body;

    UserService.login({ username, password}, (error, result) => {
        if(error) {
            return next(error);
        }

        return res.status(200).send({

            message: "Success",
            data: result,
        });
    })
} 

exports.userProfile = (req, res, next) => {

    return res.status(200).json({ message: "Authorized user"});

};