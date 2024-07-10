import express from 'express';
import { authUser, registerUser, signOut } from '../controllers/userController.js';

const userRouter= express.Router();

userRouter.post('/', authUser)

userRouter.post('/register', registerUser)

userRouter.post('/signOut', signOut)

export default userRouter;