const express = require("express");
const { isAdmin, verifyToken } = require("../controllers/jwt");
const router = express.Router();
const upload = require("./../helper/uploader");
const {
  createVacation,
  insertPhotoToDB,
  followVacation,
  editVacation,
  getVacations,
} = require("../controllers/vacation");
const getValidationFunction = require("./../validations/vacation.validation");
const moment = require("moment");
const logger = require("../logger");

const currentTime = moment().utc();

router.use(verifyToken);

router.get("/", async (req, res, nexr) => {
  try {
    const result = await getVacations();
    if (!result) throw new Error("some thing went wrong");
    logger.info(
      `get vacation from server done by - userName: ${req.user.userName} - ${currentTime}`
    );
    res.json({
      result,
    });
  } catch (ex) {
    logger.error(`${currentTime} - get vacations Failed - ${ex.message} `);
    return next({ message: ex.message, status: 400 });
  }
});

router.post(
  `/createVacation`,
  isAdmin,
  upload,
  getValidationFunction("createVacation"),
  async (req, res, next) => {
    try {
      if (!req.file) res.send("No files !");
      const result = await createVacation(req.body);
      if (!result) throw new Error("some thing went wrong");
      const insertImages = await insertPhotoToDB(req.file.path, result);
      logger.info(
        `new vacation from - userName: ${req.user.userName} - ${currentTime}`
      );
      res.json({
        fileUrl: "http://localhost:3000/images/" + req.file.filename,
        result,
      });
    } catch (ex) {
      logger.error(`${currentTime} - create vacation Failed - ${ex.message} `);
      return next({ message: ex.message, status: 400 });
    }
  }
);

router.put(
  `/:vacationId`,
  isAdmin,
  upload,
  getValidationFunction("createVacation"),
  async (req, res, next) => {
    try {
      if (!req.file) res.send("No files !");
      const { vacationId } = req.params;
      const result = await editVacation(req.body, vacationId);
      if (!result) throw new Error("some thing went wrong");
      const insertImages = await insertPhotoToDB(req.file.path, result);
      logger.info(
        ` vacation has been updated  By - userName: ${req.user.userName} - ${currentTime}`
      );
      res.json({
        result,
      });
    } catch (ex) {
      logger.error(`${currentTime} - edit vacation Failed - ${ex.message} `);
      return next({ message: ex.message, status: 400 });
    }
  }
);

router.post("/follow", async (req, res, next) => {
  const { userId, vacationId } = req.body;
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

// router.delete("/element/:id", function(req, res) {
//   Image.findByIdAndRemove(req.params.id, function(err) {
//     if(err) {
//       //Error Handling
//     } else {

// fs.unlink(path+req.file.filename, (err) => {
//         if (err) {
//             console.log("failed to delete local image:"+err);
//         } else {
//             console.log('successfully deleted local image');
//         }
// });
//     }
//   });
// });

module.exports = router;
