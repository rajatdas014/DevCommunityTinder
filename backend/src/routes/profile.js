import { Router } from 'express';
const profileRouter = Router();
import { hash } from 'bcrypt';
import { passwordValidator } from '../utils/passwordValidator.js';
import userAuth from '../middlewares/auth.js';
import { validateEditProfileData } from '../utils/validation.js';


profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.status(400).send('ERROR:' + err.message);
    }
});

profileRouter.post('/profile/edit', userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error('Invalid change request');
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((field) => loggedInUser[field] = req.body[field])
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser,
        });


    }
    catch (err) {
        res.status(401).send('ERROR: ' + err.message);
    }
})

profileRouter.post('/profile/password', userAuth, async (req, res) => {
    try {

        const loggedUser = req.user;
        const getPasswordInput = req.body.password;
        passwordValidator(req);

        if (!getPasswordInput) {
            throw new Error('wrong input, please check once ');
        }
        const passwordEncypt = await hash(getPasswordInput, 10);
        loggedUser.password = passwordEncypt;

        await loggedUser.save();
        res.send(`${loggedUser.firstName}, your password updated successfully`);

    }
    catch (err) {
        res.status(400).send('ERROR : ' + err.message);

    }

});

export default profileRouter;