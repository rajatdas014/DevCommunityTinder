const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const USER_SHARED_DATA = ["firstName", "lastName", "photoUrl", "age", "about", "skills"];


userRouter.get('/user/requests/recieved', userAuth, async (req, res) => {
    try {
        const LoggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: LoggedInUser._id,
            status: 'interested',
        }).populate("fromUserId", USER_SHARED_DATA);

        res.status(200).json({
            message: "Data fetched successfully",
            data: connectionRequests
        })
    }
    catch (err) {
        res.status(400).send('ERROR : ' + err.message);
    }
})

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'accepted' },
                { toUserId: loggedInUser._id, status: 'accepted' }
            ]
        })
            .populate("fromUserId", USER_SHARED_DATA)
            .populate("toUserId", USER_SHARED_DATA);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });


        res.status(200).json({
            message: "Data fetched successfully !",
            data,
        })


    }
    catch (err) {
        res.status(400).send('ERROR : ' + err.message);
    }
});

module.exports = userRouter;