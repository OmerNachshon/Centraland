const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

//connect to mongoose
mongoose.connect("mongodb+srv://user_name:password@.....");

//require route
app.use("/", require("./routes/landRoute"));
app.use("/", require("./routes/userRoute"));
app.listen(3001, function () {
  console.log("express server is running on port 3001");
});
