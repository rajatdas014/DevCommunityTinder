const mongoose = require('mongoose');
const validitor = require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName:
    {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName:
    {
        type: String,
        minLength: 4,
        maxLength: 50,
    },
    emailId:
    {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validitor.isEmail(value)) {
                throw new Error('Invalid email id ' + value);
            }
        }
    },
    password:
    {
        type: String,
        required: true,
    },
    age:
    {
        type: Number,
        min: 18,
    },
    gender:
    {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error('Gender data not valid');
            }
        }
    },
    photoUrl:
    {
        type: String,
        default: "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg",
        validate(value) {
            if (!validitor.isURL(value)) {
                throw new Error('Invalid image url ' + value);
            }
        }
    },
    about:
    {
        type: String,
        default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    skills:
    {
        type: [String],
    },
}, { timestamps: true })

userSchema.methods.getJWT = async function () {
    const user = this;
    var token = await jwt.sign({ _id: user._id }, 'DEV@Tinder790', { expiresIn: '1d' });

    return token;
}
userSchema.methods.validatePassword = async function (passwordByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordByUser, passwordHash);

    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);