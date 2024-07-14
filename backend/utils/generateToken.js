import jwt from 'jsonwebtoken';


const generateToken = (res, userId) => {
    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

   console.log(token);

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'None', // For cross-origin requests
    });
 
};

export default generateToken;
