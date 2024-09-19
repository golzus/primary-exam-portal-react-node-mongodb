

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyAdmin = require("../middleware/verifyAdmin");
const login = async (req, res) => {
  const { username, password } = req.body;
  const ee = await User.find()

  if (!username || !password)
    return res.status(401).json({
      erreo: true,
      message: "allfields are required",
      data: null,
    });

  const foundUser = await User.findOne({
    username: username,
    // deleted: false,
    // active: true,
  })

    .populate("class", { name: 1, image: 1 })
    .lean();
  console.log(foundUser, "found");
  if (!foundUser) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized",
      data: null,
    });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(401).json({
      erreo: true,
      message: "Unauthorized",
      data: null,
    });
  }

  const userInfo = {
    _id: foundUser._id,
    username: foundUser.username,
    fullname: foundUser.fullname,
    roles: foundUser.roles,
    class: foundUser.class,
    // company: foundUser.company,
    class: foundUser.class,
  };
  const accessToken = jwt.sign(userInfo, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,  // רק אם את משתמשת ב-HTTPS
    sameSite: 'None',  // עבור דומיינים שונים
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};
// const refresh = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) {
//     return res.status(401).json({
//       error: true,
//       message: "Unauthorized",
//       data: null,
//     });
//   }}
const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized: no refresh",
      data: null,
    });
  }
  const refreshToken = cookies.jwt;

  //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
  //     if (err) {
  //       console.log("Refresh token verification error:", err);
  //       return res.status(403).json({
  //         error: true,
  //         message: "Forbidden: Invalid refresh token",
  //         data: null,
  //       });
  //     }

  //     const foundUser = await User.findOne({
  //       username: decode.username,
  //       deleted: false,
  //       active: true,
  //     })
  //       .populate("class", { name: 1, image: 1 })
  //       .lean();

  //     if (!foundUser) {
  //       return res.status(401).json({
  //         error: true,
  //         message: "Unauthorized: User not found",
  //         data: null,
  //       });
  //     }

  //     const userInfo = {
  //       _id: foundUser._id,
  //       username: foundUser.username,
  //       fullname: foundUser.fullname,
  //       roles: foundUser.roles,
  //       class: foundUser.class,
  //     };

  //     // Create new access token
  //     const accessToken = jwt.sign(userInfo, process.env.ACCES_TOKEN_SECRET, {
  //       expiresIn: "15m",
  //     });

  //     res.json({ accessToken });
  //   });
  // };


  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decode) => {
      if (err) {
        return res.status(403).json({
          error: true,
          message: "Forbidden",
          data: null,
        });
      }
      console.log(decode.username,"decode");
      const foundUser = await User.findOne({
        username: decode.username,
        // deleted: false,
        // active: true,
      })
        .populate("class", { name: 1 })
        .lean();
      if (!foundUser) {
        return res.status(401).json({
          error: true,
          message: "Unauthorized: User not found",
          data: null,
        });
      }
      const userInfo = {
        _id: foundUser._id,
        username: foundUser.username,
        fullname: foundUser.fullname,
        roles: foundUser.roles,
        class: foundUser.class,

        // company: foundUser.class
      };

      const accessToken = jwt.sign(userInfo, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: "15m",
      });

      res.json({ accessToken });
    }
  );
};

const logout = async (req, res) => {
  console.log("hhh")
  const cookies = req.cookies;
  console.log("hhh",cookies)

  if (!cookies?.jwt) {
    console.log(cookies,";;");
    return res.status(204).json({
      error: true,
      message: "no content",
      data: null,
    });
  }
  res.clearCookie("jwt", {
    httppOnly: true,
  });
  res.json({
    error: false,
    message: "Cookie Cleard",
    data: null,
  });
};
module.exports = { login, refresh, logout };


