import { Router } from "express";
import {uploadSong,getAllSong} from "../controllers/song.controller.js"
import {getSongById} from "../controllers/song.controller.js"
import {checkArtist} from "../middleware/artist.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {upload} from '../utils/multer.js'


const songRouter = Router();

songRouter.post("/song",authMiddleware,checkArtist,upload.single("song"),uploadSong )
songRouter.get("/song/all",authMiddleware,checkArtist,getAllSong)
songRouter.get("/song/:id",getSongById)
export {songRouter}