import { uploadFile } from "../service/imageKit.service.js";
import { songModel } from "../models/song.model.js";
import id3 from "node-id3";

export async function uploadSong(req, res) {
  console.log(req.body);
  console.log(req.file);
  const { id } = req.user;

  const { title, artist, image } = id3.read(req.file.buffer);
  const fileResult = await uploadFile(req.file.buffer, req.file.originalname);
  let posterUrl ="";
  if(image){
    const imageFileResult = await uploadFile(
    image.imageBuffer,
    req.file.originalname + ".jpg",
  );
  posterUrl=imageFileResult.url
  }
  const song = await songModel.create({
    title,
    artist,
    url: fileResult.url,
    posterUrl,
    createdBy: id,
  });

  res.status(201).json({
    message: "Song uploaded successfully",
    song,
  });
}

// const deleteSong = async(req, res)=>{
//     const user = await User.findById(req.user?._id)
//     if(!user){
//       return res.status(404).json({message:"User not found"})
//     }
//     if(user.userType !== "artist"){
//       return res.status(403).json({message:"User is not an artist"})
//     }
//     const song = await Song.findById(req.params.id)
//     if(!song){
//       return res.status(404).json({message:"Song not found"})
//     }
//     if(song.artist !== user._id){
//       return res.status(403).json({message:"User is not the artist of this song"})
//     }
//     await song.remove()
//     res.status(200).json({message:"Song deleted successfully"})
// }
