import { Schema, model } from 'mongoose';



const connectionRequestSchema = new Schema({
    fromUserId:
    {
        type: Schema.Types.ObjectId,
        ref: "User", //reference to the user collection
        required: true,
    },

    toUserId:
    {
        type: Schema.Types.ObjectId,
        ref: "User", //reference to the user collection
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

const ConnectionRequestModel = new model('ConnectionRequest', connectionRequestSchema);

export default ConnectionRequestModel