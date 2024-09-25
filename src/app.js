const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const { validateSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt');

app.use(express.json());


// add user
app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;
        //validation 
        validateSignUpData(req);

        // encrypt password
        const passwordEncypt = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: passwordEncypt });
        await user.save();
        res.send('user added succesfully');
    }
    catch (err) {
        res.status(400).send('ERROR:' + err.message);
    }
});


app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error('Invalid Credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.send('Login Successful ');
        }
        else {
            throw new Error('Invalid Credentials !!!');
        }

    }
    catch (err) {
        res.status(400).send('ERROR:' + err.message);
    }
})

// get user by emaild 
app.get('/user', async (req, res) => {
    const getEmailId = req.body.emailId;
    console.log(getEmailId);
    try {
        const userEmailId = await User.find({
            emailId: getEmailId
        });
        res.send(userEmailId);
    }
    catch (err) {
        res.status(401).send('user not found');
    }
})

// feed all user data
app.get('/feed', async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send(allUsers);
    }
    catch (err) {
        res.status(401).send('something went wrong !');
    }

})

// delete user by id
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete({ _id: userId });
        res.send('user deleted successfully');
    }
    catch (err) {
        res.status(401).send('something went wrong !');
    }
});

// update user by id
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const updateData = req.body;
    try {
        const UPDATE_ALLOWED = ["password", "gender", "photoUrl", "about", "skills"];
        const isUpdateAllowed = Object.keys(updateData).every((key) => UPDATE_ALLOWED.includes(key));
        if (!isUpdateAllowed) {
            throw new Error('update not allowed');
        }
        if (updateData?.skills.length > 10) {
            throw new Error('skills cannot be more than 10');
        }
        await User.findByIdAndUpdate({ _id: userId }, updateData, { runValidators: true });
        res.send('updated data successfully');

    }
    catch (err) {
        res.status(401).send('something went wrong !' + err.message);
    }
});

// update user by emailId
app.patch('/users', async (req, res) => {
    const emailId = req.body.emailId;
    const updateData = req.body;
    try {
        await User.findOneAndUpdate({ emailId: emailId }, updateData);
        res.send('updated data successfully');
    }
    catch (err) {
        res.status(401).send('something went wrong !' + err.message);
    }
});

connectDB()
    .then(() => {
        console.log('connection established');
        app.listen(3000, () => {
            console.log('listening to port 3000');
        });
    }).catch((err) => {
        console.error('connection failed !!');
    });