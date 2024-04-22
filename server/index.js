const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const photoRouter = require("./routes/photo");

const app = express();


mongoose.connect("mongodb://localhost:27017/photoApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json());
app.use(cors())


app.use("/api/photos", photoRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
