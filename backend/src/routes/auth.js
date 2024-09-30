const express = require('express');
const authRouter = express.Router();

const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');


authRouter.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;
        //validation 
        validateSignUpData(req);

        // encrypt password
        const passwordEncypt = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: passwordEncypt });
        await user.save();
        res.send('user added succesfully');
    }
    catch (err) {
        res.status(400).send('ERROR:' + err.message);
    }
});


authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error('Invalid Credentials');
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            // create jwt token
            var token = await user.getJWT();

            // add token to cookie and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 900000) });

            res.send('Login Successful ');

        }
        else {
            throw new Error('Invalid Credentials !!!');
        }

    }
    catch (err) {
        res.status(400).send('ERROR:' + err.message);
    }
})


authRouter.post('/logout', async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send('user logged out');
});



module.exports = authRouter;