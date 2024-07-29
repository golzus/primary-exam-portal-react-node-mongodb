//const User = require("../models/User");
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const {username,password}=req.body
  if(!username||!password)return res.status(400).send("username,password are required")

  const foundUser=await User.findOne({username:username}).lean()
  if(!foundUser||!foundUser.active)
  {
    console.log("ddd");
    return res.status(401).json({message:"Unauthorized"})
}
  const match =await bcrypt.compare(password,foundUser.password)

if(!match){
  console.log("aaaa");
return res.status(401).json({message:"Unauthorized"})}



const userInfo={
  _id:foundUser._id,
  fullname:foundUser.fullname,
  username:foundUser.username,
  roles:foundUser.roles,
  email:foundUser.email
}
//ליצירת סיסמא
//require("crypto").randomBytes(64).toString("hex")
const acceTtoken=jwt.sign(userInfo,process.env.ACCES_TOKEN_SECRET)

res.json({acceTtoken})
};
const register = async (req, res) => {
  const { username, password, fullname, email, phone } = req.body;
  if (!username || !password || !fullname || !email || !phone)
    return res
      .status(400).send("username,password,fullname,email,phone are required!");

  const duplicate = await User.findOne({ username: username }).lean();
  if (duplicate) return res.status(409).json({message:"  duplicate user"});

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password:hashPassword,
    fullname,
    email,
    phone,
  });
  if (!user) {
    return res.status(400).send("bad request");
  }
  res.json(`user ${username} created!`);
};
module.exports = { login, register };






const refresh = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
      return res.status(401).json({
          error: true,
          message: "Unauthorized: No refreshToken",
          data: null
      })
  }
  const refreshToken = cookies.jwt

  jwt.verify(refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decode) => {
          if (err) {
              return res.status(403).json({
                  error: true,
                  message: "Forbidden: Invalid refresh token",
                  data: null
              })
          }



          const foundUser = await User.findOne({ email: decode.email, deleted: false } ).lean(); // Find user by email

          if (!foundUser) {
              return res.status(401).json({
                  error: true,
                  message: "Unauthorized: User not found",
                  data: null
              });
          }
          const userInfo = {
              _id: foundUser._id,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              email: foundUser.email,
              phone: foundUser.phone,
              roles: foundUser.roles,
              image: foundUser.image,
              active:foundUser.active
          };


          const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })

          res.json({ accessToken })
      })

}