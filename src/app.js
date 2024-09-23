const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();



app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: 'John',
        lastName: 'Wick',
        age: '35',
        emailId: 'john@wick.com',
    });

    try {
        await user.save();
        res.send('user added succesfully');
    }
    catch (err) {
        res.status(400).send('user not added', err.message);
    }

})

connectDB()
    .then(() => {
        console.log('connection established');
        app.listen(3000, () => {
            console.log('listening to port 3000');
        });
    }).catch((err) => {
        console.error('connection failed !!');
    });