// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const login = async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res.status(401).json({
//       erreo: true,
//       message: "allfields are required",
//       data: null,
//     });

//   const foundUser = await User.findOne({
//     username: username,
//     deleted: false,
//     active: true,
//   })
//     .populate("company", { name: 1, image: 1 })
//     .lean();
//   if (!foundUser) {
//     return res.status(401).json({
//       erreo: true,
//       message: "Unauthorized",
//       data: null,
//     });
//   }

//   const match = await bcrypt.compare(password, foundUser.password);
//   if (!match) {
//     return res.status(401).json({
//       erreo: true,
//       message: "Unauthorized",
//       data: null,
//     });
//   }

//   const userInfo = {
//     username: foundUser.username,
//     fullname: foundUser.fullname,
//     roles: foundUser.roles,
//     company: foundUser.company,
//   };
//   const acssesToken = jwt.sign(userInfo, process.env.ACCES_TOKEN_SECRET, {
//     expiresIn: "15m",
//   });
//   const refreshToken = jwt.sign(
//     { username: foundUser.username },
//     process.env.ACCES_TOKEN_SECRET,
//     { expiresIn: "7d" }
//   );

//   res.cookie("jwt", refreshToken, {
//     httpOnly: true,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   res.json({ acssesToken });

//   const refresh = async (req, res) => {
//     const cookies = req.cookies;
//     if (!cookies?.jwt)
//       return res.status(401).json({
//         erreo: true,
//         message: "Unauthorized",
//         data: null,
//       });
   

//   const logout = async (req, res) => {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) {
//       return res.status(204).json({
//         erreo: true,
//         message: "no content",
//         data: null,
//       });
//     }
//     res.clearCookie("jwt", {
//       httppOnly: true,
//     });
//     res.json({
//       error: false,
//       message: "Cookie Cleard",
//       data: null,
//     });
//   };
// }
// };
// module.exports = { login, refresh, logout };
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(401).json({
      erreo: true,
      message: "allfields are required",
      data: null,
    });

  const foundUser = await User.findOne({
    username: username,
    deleted: false,
    active: true,
  })
    .populate("company", { name: 1, image: 1 })
    .lean();
  if (!foundUser) {
    return res.status(401).json({
      erreo: true,
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
    username: foundUser.username,
    fullname: foundUser.fullname,
    roles: foundUser.roles,
    company: foundUser.company,
    class:foundUser.class
  };
  const acssesToken = jwt.sign(userInfo, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCES_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ acssesToken });
}
  const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.status(401).json({
        erreo: true,
        message: "Unauthorized",
        data: null,
      });
    }

  const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(204).json({
        erreo: true,
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
