import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { User } from "../models/user.model.js";
import { compairePass } from "../models/user.model.js";

const register = async (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password ) {
    return res.status(400).json({ message: "All field required..." });
  }
  const existsData = await User.findOne({ email });
  if (!existsData) {
    const user = await User.create({
      email,
      password,
      userType,
    });
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        userType: user.userType,
      },
      config.JWT_ACCESS_TOKEN_KEY,
      {
        expiresIn: config.JWT_ACCESS_TOKEN_KEY_EXPIRE,
      },
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.JWT_REFRESH_TOKEN_KEY,
      {
        expiresIn: config.JWT_REFRESH_TOKEN_KEY_EXPIRE,
      },
    );
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res
      .status(201)
      .json({ message: "Register successful & user logged in" });
  } else {
    res.status(409).json({ message: "All ready user exsit.." });
  }
};

export { register };

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All field required" });
  }

  const loggedInUser = await User.findOne({ email });

  if (!loggedInUser) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  const isMatch = await compairePass(password, loggedInUser.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const accessToken = jwt.sign(
    {
      id: loggedInUser._id,
      email: loggedInUser.email,
      userType: loggedInUser.userType,
    },
    config.JWT_ACCESS_TOKEN_KEY,
    { expiresIn: config.JWT_ACCESS_TOKEN_KEY_EXPIRE },
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  const refreshToken = jwt.sign(
{
  id: loggedInUser._id,
  email: loggedInUser.email
},
config.JWT_REFRESH_TOKEN_KEY,
{
  expiresIn: config.JWT_REFRESH_TOKEN_KEY_EXPIRE
}
)

loggedInUser.refreshToken = refreshToken
await loggedInUser.save()

res.cookie("refreshToken", refreshToken,{
  httpOnly:true,
  secure:true,
  sameSite:"strict"
})

  res.status(200).json({ message: "Login successfull" });
};

export { login };

export const logout = async (req, res) => {
 const token = req.cookies.accessToken;
 if(!token){
    return res.status(401).json({message:"No token"})
 }
 const decoded = jwt.verify(token, config.JWT_ACCESS_TOKEN_KEY)
 await User.findByIdAndUpdate(decoded.id, {refreshToken:null})
 res.clearCookie("accessToken")
 res.clearCookie("refreshToken")
  return res.status(200).json({ message: "Logout successfull" });
};

export const getMe = async (req, res) => {

//   const refreshToken = req.cookies.refreshToken
    const accessToken = req.cookies.accessToken
  if ( !accessToken) {
    return res.status(401).json({
      message: "Refresh token missing"
    })
  }

//   const decoded = jwt.verify(
//     refreshToken,
//     config.JWT_REFRESH_TOKEN_KEY
//   )

//   const user = await User.findById(decoded.id)

//   if (!user || user.refreshToken !== refreshToken) {
//     return res.status(403).json({
//       message: "Invalid refresh token"
//     })
//   }
  const decoded = jwt.verify(
    accessToken,
    config.JWT_ACCESS_TOKEN_KEY
  )

  const user = await User.findById(decoded.id)

  if (!user || req.cookies.accessToken !== accessToken) {
    return res.status(403).json({
      message: "Invalid refresh token"
    })
  }

  res.status(200).json({
    message: "User fetched successfully",
    user
  })
}