const mongoose = require('mongoose');
const validitor = require('validator')


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


const User = mongoose.model('User', userSchema);

module.exports = User;