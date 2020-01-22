const express = require("express");
const connection = require("../../../db/connection");
const images = require("../../../db/images");
const s3 = require("../../../services/file-upload");
const uuidv1 = require('uuid/v1');

const router = express.Router();

router.post("/newImage", async (req, res) => {
  try {
    const payload = {};
    const imageData = req.body;
    const imgTitle = imageData.title;
    const image = Buffer.from(imageData.image, "base64");

    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: uuidv1(),
      Body: image,
      ACL: "public-read",
      ContentType: "image/png"
    };

    const uploading = await s3.upload(uploadParams).promise();

    payload.title = imgTitle;
    payload.url = uploading.Location;

    const insertImages = await new Promise((resolve, reject) => {
      connection.query(images.insertImage(payload), (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    res.send("Image Saved");
  } catch (err) {
    res.send(err);
  }
});

router.get("/getImages", async (req, res) => {
  try {
    const imagesRows = await new Promise((resolve, reject) => {
      connection.query(images.getImages(), (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    const result = JSON.stringify(imagesRows.map(row => row));
    res.end(result);
  } catch (err) {
    res.end(err);
  }
});

module.exports = router;
