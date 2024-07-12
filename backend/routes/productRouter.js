import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController.js';

const productRouter= express.Router();

productRouter.post('/products', getAllProducts);

productRouter.post('/product/:id', getProductById);


export default productRouter