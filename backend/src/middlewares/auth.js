import jwt from 'jsonwebtoken';
const { verify } = jwt;
import User from '../models/user.js';


// Handling middleware
const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error('Session timeout ! Please login again 😊');
        }

        const decodedReq = await verify(token, "DEV@Tinder790");
        const { _id } = decodedReq;

        const user = await User.findById(_id);

        if (!user) {
            throw new Error('User not found !!!');
        }

        req.user = user;
        next();

    }
    catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
}

export default userAuth;

