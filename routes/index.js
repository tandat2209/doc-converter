var express = require("express");
var multer = require("multer");
var sendRequestToQueue = require("../services/rabbitmq/rpc_client");

var router = express.Router();
var storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
var upload = multer({ storage });

router.post("/", upload.single("file"), async function(req, res) {
  const response = await sendRequestToQueue(req.file);
  res.end(response.content);
});

module.exports = router;
