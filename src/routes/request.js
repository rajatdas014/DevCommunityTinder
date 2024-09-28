const express = require('express');
const requestRouter = express.Router();


const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user')

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params?.toUserId;
        const status = req.params?.status;

        const allowedStatus = ['ignored', 'interested'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type " + status })
        }

        const validId = await User.findById(toUserId);
        if (!validId) {
            return res.status(400).json({ message: "user not found" })
        }

        const duplicateRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });


        if (duplicateRequest) {
            return res.status(400).json({
                message: "Connection Request already Exists !!"
            })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })

        const data = await connectionRequest.save();

        res.json({
            message: 'Connection request sent succesfully !',
            data,
        })

    }
    catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})



module.exports = requestRouter;