const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/campaigns/images");
  },
  filename: (req, file, cb) => {
    console.log("file : ", file);
    cb(null, `image-${Date.now()}-` + file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
