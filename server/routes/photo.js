const express = require("express");
const Photo = require("../models/Photo");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "degtb4kdh",
  api_key: "778862813976536",
  api_secret: "gZrAZT0eOmFFXkeWCU7fU7Yc6Gg",
});


router.post("/save", async (req, res) => {
  try {
    const { image } = req.body;
   
    const result = await cloudinary.uploader.upload(image, {
      folder: "smily_photos",
    });

    const { public_id, secure_url } = result;

    const imageData = new Photo({
      image: {
        imageUrl: secure_url,
        publicId: public_id,
      },
    });

    await imageData.save();

    // console.log("Received image:", result);
    return res
      .status(201)
      .send({ msg: "Photo saved successfully", image: imageData });
  } catch (error) {
    // console.error("Error saving photo:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/all", async (req, res) => {
  try {
    const photos = await Photo.find();
    console.log(photos)
    res.status(200).send({ data: photos });
  } catch (error) {
    console.error("Error retrieving photos:", error);
    res.send({ error });
  }
});

module.exports = router;
