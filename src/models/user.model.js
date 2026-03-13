import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "artist"],
    default:"user"
  },
  refreshToken:{
    type:String,
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds)
  
});

export const User = mongoose.model("User", userSchema);

export async function compairePass(planePassword, hashPassword){
       return await bcrypt.compare(planePassword, hashPassword)
}