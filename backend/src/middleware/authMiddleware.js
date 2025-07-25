import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No Token Provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized: Invalid or Expired Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute Middleware:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};





