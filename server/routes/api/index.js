const express = require("express");
const images = require("./images");

const router = express.Router();

router.use("/images", images);

module.exports = router;
