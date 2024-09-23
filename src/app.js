const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.use(express.json());



app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send('user added succesfully');
    }
    catch (err) {
        res.status(400).send('user not added', err.message);
    }
});

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
app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const updateData = req.body;
    try {
        await User.findByIdAndUpdate({ _id: userId }, updateData);
        res.send('updated data successfully');
    }
    catch (err) {
        res.status(401).send('something went wrong !');
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