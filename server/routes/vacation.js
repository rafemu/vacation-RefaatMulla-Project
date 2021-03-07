const express = require("express");
const { isAdmin, verifyToken } = require("../controllers/jwt");
const router = express.Router();
const upload = require("./../helper/uploader");
const {
  createVacation,
  insertPhotoToDB,
  followVacation,
} = require("../controllers/vacation");
const getValidationFunction = require("./../validations/vacation.validation");
const moment = require("moment");

const logger = require("../logger");

router.use(verifyToken);
const currentTime = moment().utc();

router.post(
  `/createVacation`,
  isAdmin,
  (req, res, next) => {
    const { destination, description, from, to, price } = req.body;
    console.log(req.body);
    if (!destination) return res.send("error");

    return next();
  },

  upload.single("file"),
  // getValidationFunction("createVacation"),
  async (req, res, next) => {
    console.log(req.body);
    // upload(req, res, function (imageUploadErr) {
    //   console.log("upload", req.body);
    //   console.log("upload", imageUploadErr);
    // });
    // if (!req.file) {
    //   res.status(500);
    //   return next(err);
    // }
    try {
      // const result = await createVacation(req.body);
      // if (!result) throw new Error("something went wrong");
      // const insertImages = await insertPhotoToDB(req.file.path, result);
      // logger.info(
      //   `new vacation from - userName: ${req.user.userName} - ${currentTime}`
      // );
      // res.json({
      //   fileUrl: "http://localhost:3000/images/" + req.file.filename,
      //   result,
      // });
    } catch (error) {
      logger.error(
        `${currentTime} - create vacation Failed - ${error.message} `
      );
      return next({ message: ex.message, status: 400 });
    }
  }
);

router.post("/follow", async (req, res, next) => {
  const { userId, vacationId } = req.body;
  console.log(req.body);
  try {
    if (!userId || !vacationId) res.status(400).send("error");
    const result = await followVacation(userId, vacationId);
    if (!result) throw new Error("something went wrong");
    res.status(200).json(`you have followed vacationId ${vacationId}`);
    logger.info(`${userId} has followed vacationId ${vacationId}`);
  } catch (ex) {
    console.log(ex.message);
    return next({ message: ex.message, status: 400 });
  }
});

module.exports = router;
