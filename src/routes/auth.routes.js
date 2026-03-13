import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/auth.controller.js";

import {authMiddleware} from "../middleware/auth.middleware.js"

const authRouter = Router();

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.get("/getme",authMiddleware, getMe)
export {authRouter}