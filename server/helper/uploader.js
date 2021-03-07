const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(req.body);
    // const { destination, description, from, to, price } = req.body;

    // if (!destination || !description || !from || !to || !price)
    //   throw new Error("error");
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
