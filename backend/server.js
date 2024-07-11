import express from 'express';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import connectToDB from './db.js';
import cors from 'cors';
import path from 'path';
import productRouter from './routes/productRouter.js';

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

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/userRouter', userRouter);
app.use('/api/orderRouter', orderRouter);
app.use('/api/productRouter', productRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});