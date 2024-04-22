const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  image: { imageUrl: String, publicId: String },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
