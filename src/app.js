const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);


connectDB()
    .then(() => {
        console.log('connection established');
        app.listen(3000, () => {
            console.log('listening to port 3000');
        });
    }).catch((err) => {
        console.error('connection failed !!');
    });