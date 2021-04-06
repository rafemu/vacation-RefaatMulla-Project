const express = require("express");
const { isAdmin, verifyToken } = require("../controllers/jwt");
const router = express.Router();
const upload = require("./../helper/uploader");
const {
  createVacation,
  insertPhotoToDB,
  followVacation,
  isFollowAlreadyExist,
  unFollowVacation,
  editVacation,
  getVacations,
  deleteVacationById,
  getVacationById,
  _deleteImageFromStorage,
  updatePhotoToDB,
} = require("../controllers/vacation");
const getValidationFunction = require("./../validations/vacation.validation");
const moment = require("moment");
const logger = require("../logger");

const currentTime = moment().utc();

router.use(verifyToken);

router.get("/", async (req, res, next) => {
  try {
    const result = await getVacations(req.user.id);
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
  "/:vacationId",
  isAdmin,
  upload,
  getValidationFunction("createVacation"),
  async (req, res, next) => {
    try {
      const { vacationId } = req.params;
      const getOldImagePath = await getVacationById(vacationId);
      const result = await editVacation(req.body, vacationId);
      if (!result) throw new Error("some thing went wrong");
      if (req.file.path == !undefined)
        await _deleteImageFromStorage(getOldImagePath.imagePath);

      const getImgPath =
        req.file.path === undefined ? getOldImagePath.imagePath : req.file.path;
      const insertImages = await updatePhotoToDB(getImgPath, vacationId);
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

router.post(
  "/follow",
  getValidationFunction("followSchema"),
  async (req, res, next) => {
    const { vacationId } = req.body;
    const userId = req.user.id;

    try {
      if (!userId || !vacationId) res.status(400).send("error");
      const isExist = await isFollowAlreadyExist(vacationId, userId);
      if (isExist) {
        const unFollow = await unFollowVacation(vacationId, userId);
        res.status(200).json(`you have un-followed vacationId ${vacationId}`);
        logger.info(`${userId} has un-followed vacationId ${vacationId}`);
      } else {
        const result = await followVacation(userId, vacationId);
        if (!result) throw new Error("something went wrong");
        res.status(200).json(`you have followed vacationId ${vacationId}`);
        logger.info(`${userId} has followed vacationId ${vacationId}`);
      }
    } catch (ex) {
      console.log(ex.message);
      return next({ message: ex.message, status: 400 });
    }
  }
);

router.delete(
  "/:vacationId",
  getValidationFunction("deleteSchema"),
  isAdmin,
  async (req, res, next) => {
    const vacationId = req.params.vacationId;
    try {
      const checkIfVacationExist = await getVacationById(vacationId);
      if (!checkIfVacationExist) throw new Error("Invalid Vacation");
      const result = await deleteVacationById(vacationId);
      if (!result) throw new Error("error in deleteing vacation");
      const deleteImage = _deleteImageFromStorage(
        checkIfVacationExist.imagePath
      );
      res.status(200).json(`you have deleted vacationId ${vacationId}`);
      logger.info(`${req.user.userName} has deleted vacationId ${vacationId}`);
    } catch (ex) {
      return next({ message: ex.message, status: 400 });
    }
  }
);

module.exports = router;
