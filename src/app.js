const express = require('express');
const { adminAuth } = require('./middlewares/auth');

const app = express();

app.use('/', (err, req, res, next) => {
    if (err) {
        res.status(500).send('Something went wrong, contact support team !!!');
    }
})


app.get('/user', (req, res) => {
    try {
        throw new Error('error');
        res.send('all users'); // route handling
    }
    catch (err) {
        res.status(500).send('Something went wrong !!!');
    }

})



// app.use('/admin', adminAuth)

// app.get('/user', (req, res) => {
//     res.send('all users'); // route handling
// })

// app.get('/admin/getData', (req, res) => {
//     res.send('all get data');
// })
// app.get('/admin/postData', (req, res) => {
//     res.send('all post data')
// })

app.listen(3000, () => {
    console.log('listening to port 3000');
});