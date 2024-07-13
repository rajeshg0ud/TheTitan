import express from 'express';
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import connectToDB from './db.js'; 
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 5000;
connectToDB();

app.use(cors({
    origin:   'https://the-titan.vercel.app' ,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
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
