const express = require('express');
const mongoose = require('mongoose');
const dbconfig = require('./config/dbconnection');
const users = require('./Routes/user');

const app=express();

const auth = require('./middleware/auth');
const errors = require('./middleware/errors');

const unless = require('express-unless');

mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('Database connected...');
    },
    (error) => {
        console.log('Database connection failed....'+error);
    }
)

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
        { url: "/users/login", methods: ["POST"] },
        { url :"/user/register", methods: ["POST"] },
        ],
    })
);

app.use(express.json());

app.use('/users', users);

app.use(errors.errorHandler);

app.listen(process.env.port || 4000, ()=> {

    console.log("Server is istening on port 4000......")

});

