const jwt = require('jsonwebtoken');
const User = require('../models/user');
// Handling middleware
const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error('Session timeout ! Please login again 😊');
        }

        const decodedReq = await jwt.verify(token, "DEV@Tinder790");
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

module.exports = { userAuth };

