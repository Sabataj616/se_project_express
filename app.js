const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: "69034e69d0e8188923c502d7",
  };
  next();
});
app.use("/", mainRouter);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
