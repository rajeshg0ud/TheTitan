import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController.js';

const productRouter= express.Router();

productRouter.post('/products', getAllProducts);

productRouter.get('/product/:id', getProductById);


export default productRouter