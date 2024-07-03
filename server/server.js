require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const connectDB = require("./config/dbConn");
const PORT = 1000;
//const PORT=process.env.PORT||33
connectDB();
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("home 1 page");
});

app.use("/api/listwords", require("./routes/listWordsRoute"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/companies", require("./routes/compamyRoute"));
app.use("/api/schools", require("./routes/schoolRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/test",require("./routes/testRoute"))
mongoose.connection.once("open", () => {
  console.log("connect to db success");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("****************DB ERROR*****************");
  console.log(err);
});