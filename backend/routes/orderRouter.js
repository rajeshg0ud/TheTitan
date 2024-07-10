import express from 'express';
import { placeOrder, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../utils/protect.js';

const orderRouter= express.Router();

orderRouter.post('/placeOrder', protect, placeOrder)
orderRouter.get('/myOrders', protect, getMyOrders)


export default orderRouter;