import jwt from 'jsonwebtoken'


const generateToken= (res, userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
        })

    console.log(token);

        //set token through server as http cookie, not directly to client local storgae
        res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true for production
    sameSite: 'none', // Required for cross-origin requests
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});
}

export default generateToken;
