const express = require('express');
const requestRouter = express.Router();

const { userAuth } = require('../middlewares/auth')

requestRouter.post('/sendconnection', userAuth, async (req, res) => {
    try {

        const user = req.user;
        res.send(user.firstName + ' have sent the connection request !!!');
    }
    catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})



module.exports = requestRouter;