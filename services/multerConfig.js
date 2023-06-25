const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(req);
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = {
  multer,
  storage,
};