import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next)=>{
    const token = req.cookies.accessToken
    if(!token) {
        return res.status(401).json({message:"User not logged in"})
    }
    const decoded = jwt.verify(token, config.JWT_ACCESS_TOKEN_KEY)
    req.user = decoded
    next()
}