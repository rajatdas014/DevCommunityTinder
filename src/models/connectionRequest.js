const mongoose = require('mongoose');



const connectionRequestSchema = new mongoose.Schema({
    fromUserId:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    toUserId:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    status:
    {
        type: String,
        required: true,
        enum: {
            values: ['interested', 'ignored', 'accepted', 'rejected'],
            message: `{VALUE} is incorrect status type`,
        },
    },
},
    { timestamps: true, }
);

// compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

connectionRequestSchema.pre('save', function (next) {
    const conectionRequest = this;
    if (conectionRequest.fromUserId.equals(conectionRequest.toUserId)) {
        throw new Error('Cannot send connection request to yourself !');
    }

    next();
})

const ConnectionRequestModel = new mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequestModel