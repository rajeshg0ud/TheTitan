import asyncHandler from '../asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400).json('Invalid credentials');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const newUser = await User.create({ name, email, password });

    if (newUser) {
        generateToken(res, newUser._id);
        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
});

const signOut = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/'
    });

    res.status(200).json('Logged out successfully');
});

export { authUser, registerUser, signOut };
