import mongoose,{model, Schema} from "mongoose";


const songSchema = new Schema({
    title:{
        type:String
    },
    artist:{
        type:String
    },
    url:{
        type:String
    },
    posterUrl:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    }

})

const songModel = mongoose.model("songModel",songSchema)
export {songModel}