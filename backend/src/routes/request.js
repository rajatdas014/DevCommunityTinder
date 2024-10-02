import { Router } from 'express';
const requestRouter = Router();


import userAuth from '../middlewares/auth.js';
import ConnectionRequestModel from '../models/connectionRequest.js';
import User from '../models/user.js';

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const { toUserId, status } = req.params;

        const allowedStatus = ['ignored', 'interested'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type " + status })
        }

        const validId = await User.findById(toUserId);
        if (!validId) {
            return res.status(400).json({ message: "user not found" })
        }

        const duplicateRequest = await ConnectionRequestModel.findOne({
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

        const connectionRequest = new ConnectionRequestModel({
            fromUserId, toUserId, status
        })

        const data = await connectionRequest.save();

        res.json({
            message: 'Connection request sent succesfully !',
            data,
        });


    }
    catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
});


requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {

        const LoggedInUser = req.user;
        const { requestId, status } = req.params;

        const allowedStatus = ['accepted', 'rejected'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed : " + status });
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: LoggedInUser._id,
            status: "interested",
        });
        if (!connectionRequest) {
            return res.status(400).json({ message: "Connection request not found " })
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.status(200).json({ message: "Connection request " + status, data });

    }
    catch (err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})




export default requestRouter;