import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
console.log(token)
    // Set token as an HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  
        sameSite: 'none',  
        maxAge: 30 * 24 * 60 * 60 * 1000,  
    });
 
};

export default generateToken;
