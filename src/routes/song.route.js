import { Router } from "express";
import {uploadSong} from "../controllers/song.controller.js"
import {checkArtist} from "../middleware/artist.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {upload} from '../utils/multer.js'


const songRouter = Router();

songRouter.post("/song",authMiddleware,checkArtist,upload.single("song"),uploadSong )

export {songRouter}