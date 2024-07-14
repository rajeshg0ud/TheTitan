import jwt from 'jsonwebtoken';


// Sample function to set JWT token as a cookie
const setToken = (res, user) => {
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        sameSite: 'None', // For cross-origin requests
    });
 
};

export default generateToken;
