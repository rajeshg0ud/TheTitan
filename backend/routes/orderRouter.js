import express from 'express';
import { placeOrder, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../utils/protect.js';

const orderRouter= express.Router();

orderRouter.post('/placeOrder', protect, placeOrder)
orderRouter.post('/myOrders', protect, (req, res, next) => {
    console.log("Executing getMyOrders handler"); // Log to verify getMyOrders handler execution
    next(); // Call next middleware or route handler
}, getMyOrders);


export default orderRouter;
