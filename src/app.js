import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import {authRouter} from "./routes/auth.routes.js"
import {songRouter} from "./routes/song.route.js"

const app = express()
app.use(express.json())
app.use(morgan("dev"));
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/artist",songRouter)
app.use("/api/song",songRouter)
export default app