const express = require('express');
const profileRouter = express.Router();
const bcrypt = require('bcrypt');

const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation')


profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.status(400).send('ERROR:' + err.message);
    }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error('Invalid change request');
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((field) => loggedInUser[field] = req.body[field])
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}, your profile updated successfully`);


    }
    catch (err) {
        res.status(401).send('ERROR: ' + err.message);
    }
})

profileRouter.patch('/profile/password', userAuth, async (req, res) => {
    try {
        const loggedUser = req.user;
        const getPasswordInput = req.body.password;
        if (!getPasswordInput) {
            throw new Error('worng input, please check once ');
        }
        const passwordEncypt = await bcrypt.hash(getPasswordInput, 10);
        loggedUser.password = passwordEncypt;

        await loggedUser.save();
        res.send(`${loggedUser.firstName}, your password updated successfully`);

    }
    catch (err) {
        res.status(400).send('ERROR : ' + err.message);

    }

});

module.exports = profileRouter;