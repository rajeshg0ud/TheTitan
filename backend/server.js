import express from 'express';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import connectToDB from './db.js';
import cors from 'cors';

const app = express();
const PORT = 5000;
connectToDB();

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/userRouter', userRouter);
app.use('/api/orderRouter', orderRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
