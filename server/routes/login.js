const express = require("express");
const bcrypt = require("bcryptjs");
const { signJWT, isAdmin } = require("../controllers/jwt");
const router = express.Router();
const logger = require("../logger");
const moment = require("moment");

const currentTime = moment().utc();

const {
  isUserRegistered,
  createUser,
  changePassword,
} = require("../controllers/users");

const getValidationFunction = require("../validations/login.validation");

router.post(
  "/login",
  getValidationFunction("login"),
  async (req, res, next) => {
    const { userName, password } = req.body;

    try {
      logger.info(`tring to login - userName: ${userName} - ${currentTime}`);
      if (!userName || !password) res.send("error");
      const result = await isUserRegistered(userName);
      if (!result) throw new Error('Invalid UserName!"');
      const passwordIsValid = bcrypt.compareSync(password, result.password);
      if (!passwordIsValid) throw new Error('Invalid Password!"');
      if (result) {
        const token = await signJWT(result);
        logger.info(
          `currentTime: ${currentTime} ###### Logged User :${result.firstName}  Role : ${result.role}`
        );
        res.cookie("auth", token);

        return res.json({
          message: `redirect`,
          id: result.id,
          username: result.firstName,
          role: result.role,
          accessToken: token,
        });
      }
      //return res.json({ message: `Hello ${result.firstName} , login success` });
    } catch (error) {
      logger.error(`${currentTime} - Login Failed - ${error.message} `);
      return res.json({
        message: `Login Failed - ${error.message}`,
        status: 500,
      });
    }
  }
);

const _registerPath = "register";
router.post(
  `/${_registerPath}`,
  getValidationFunction(_registerPath),
  async (req, res, next) => {
    const { userName } = req.body;
    try {
      const result = await isUserRegistered(userName);
      if (result) throw new Error(`User ${result.userName} is already exist`);
      const create = await createUser(req.body);
      if (create) {
        logger.info(
          `currentTime: ${currentTime} ###### Register New User :${userName}`
        );
        return res.json({ message: `Registration completed` });
      } else throw new Error("Registration Failed");
    } catch (ex) {
      logger.error(`${currentTime} - Registration Failed - ${error.message} `);
      return next({ message: ex.message, status: 400 });
    }
  }
);

const _changePasswordPath = "changePassword";
router.post(
  `/${_changePasswordPath}`,
  getValidationFunction(_changePasswordPath),
  async (req, res, next) => {
    const { userName, password, newPassword, confirmNewPassword } = req.body;
    try {
      _validateConfirmPassword(newPassword, confirmNewPassword);

      const result = await isUserRegistered(userName);
      if (!result) res.status(400).json(`Wrong Credentials`);
      const passwordIsValid = bcrypt.compareSync(password, result.password);
      if (!passwordIsValid) res.status(400).json(`Wrong password`);
      const changePassResult = await changePassword(result.id, newPassword);
      if (changePassResult) {
        logger.info(
          `${currentTime} - Password has been changed for user ${result.userName} `
        );
        return res.json({ message: "password has changed!!!" });
      } else throw new Error(`[password] was not updated`);
    } catch (ex) {
      return next({ message: ex.message, status: 400 });
    }

    function _validateConfirmPassword() {
      if (typeof newPassword !== "string") {
        console.log("newPassword type wrong");
        return;
      }
      if (newPassword !== confirmNewPassword)
        res.status(400).json(`confirm password error`);
    }
  }
);

module.exports = router;
