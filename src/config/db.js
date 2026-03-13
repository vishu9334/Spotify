import mongoose from "mongoose"
import { config } from "./config.js"
import DB_NAME from '../../constent.js'

export const DBconnection = async()=>{
    try {
       await mongoose.connect(`${config.MONGO_URI}${DB_NAME}`) 
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Your connection field to DB ")
    }
}

