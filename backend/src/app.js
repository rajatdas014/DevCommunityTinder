import express, { json } from 'express';
import connectDB from './config/database.js';
import cors from 'cors';

const app = express();

import cookieParser from 'cookie-parser';

app.use(cors({
    origin: 'http://localhost:5173s',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Explicitly handle preflight (OPTIONS) requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200); // Respond with 200 to OPTIONS preflight
});

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allow PATCH explicitly
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     optionsSuccessStatus: 204 // Some browsers (e.g., Safari) may handle the success status incorrectly, setting this helps
// }));

// // Handle preflight requests (OPTIONS method)
// app.options('*', cors());


// app.use(cors({
//     origin: 'http://localhost:5173', // Allow requests from this origin
//     credentials: true, // Allow credentials (cookies, authorization headers)
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allow PATCH method
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allow required headers
//     optionsSuccessStatus: 204 // Some browsers handle this status incorrectly, 204 is used for success.
// }));

// // Manually handle OPTIONS requests if the CORS middleware isn't catching them
// app.options('*', (req, res) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.sendStatus(204); // Respond with 204 No Content for preflight requests
// });



app.use(json());
app.use(cookieParser());

import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import requestRouter from './routes/request.js';
import userRouter from './routes/user.js';


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

// import EventEmitter from 'events'
// const event = new EventEmitter();
// let count = 0;
// event.on('countAPI',() => {
//     console.log('api called', count++);
// })

// app.get('/update', (req, res) => {
//     res.send('update called');
//     event.emit('countAPI');
// })


// app.get('/profile', (req, res) => {
//     res.send('profile called');
//     event.emit('countAPI');
// })

// app.get('/api', (req, res) => {
//     res.send('api called');
//     event.emit('countAPI');
// })


connectDB()
    .then(() => {
        console.log('connection established');
        app.listen(3000, () => {
            console.log('listening to port 3000');
        });
    }).catch((err) => {
        console.error('connection failed !!' + err);
    });