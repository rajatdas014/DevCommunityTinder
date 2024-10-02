import { Router } from 'express';
const userRouter = Router();
import userAuth from '../middlewares/auth.js';
import ConnectionRequestModel from '../models/connectionRequest.js';
import User from '../models/user.js';
const USER_SHARED_DATA = ["firstName", "lastName", "photoUrl", "age", "about", "skills"];



userRouter.get('/user/requests/recieved', userAuth, async (req, res) => {
    try {
        const LoggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
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

        const connectionRequests = await ConnectionRequestModel.find({
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


userRouter.get('/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId")
            .populate('fromUserId', 'firstName')
            .populate('toUserId', 'firstName');

        const hideConnections = new Set();
        connectionRequests.forEach((val) => {
            hideConnections.add(val.toUserId._id.toString());
            hideConnections.add(val.fromUserId._id.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideConnections) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SHARED_DATA).skip(skip).limit(limit);

        res.send(users);
    }
    catch (err) {
        res.status(400).send('ERROR : ' + err.message);
    }
})

export default userRouter;