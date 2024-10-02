import express, { json } from 'express';
import connectDB from './config/database.js';
import cors from 'cors';
const app = express();

import cookieParser from 'cookie-parser';


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

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


connectDB()
    .then(() => {
        console.log('connection established');
        app.listen(3000, () => {
            console.log('listening to port 3000');
        });
    }).catch((err) => {
        console.error('connection failed !!' + err);
    });