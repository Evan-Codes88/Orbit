import jwt from 'jsonwebtoken';

export const generateToken = (userId, response) => {
    const token =  jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    });

    response.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, // Prevents XSS attacks - cross-site scripting attacks
        sameSite: "None", //CSRFattacks cross-site request forgery attacks
        secure: true
    });

    return token
} 