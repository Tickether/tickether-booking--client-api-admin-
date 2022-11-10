import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import booksRoute from './routes/books.js'
import bookeesRoute from './routes/bookees.js'
import bookersRoute from './routes/bookers.js'
import bookingsRoute from './routes/bookings.js'
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB!')
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', ()=> {
    console.log('mongoDB disconnected!')
})

//middlewares
app.use(cors());

app.use(cookieParser());
 
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/books', booksRoute);
app.use('/api/bookees', bookeesRoute);
app.use('/api/bookers', bookersRoute);
app.use('/api/bookings', bookingsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
const port = process.env.port || 8000;
app.listen(port, ()=>{
    connect();
    console.log('Connected to backend!');
});