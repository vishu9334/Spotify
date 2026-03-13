import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
export const checkArtist = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_TOKEN_KEY)
    if (decoded.userType !== "artist") {
      return res.status(403).json({
        message: "Forbidden",
        success: false,
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};
