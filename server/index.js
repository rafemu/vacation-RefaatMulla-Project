require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const logger = require("./logger");
const upload = require("./helper/uploader");
const multer = require("multer");
const forms = multer();

//routes
const login = require("./routes/login");
const vacation = require("./routes/vacation");
const { required } = require("@hapi/joi");

logger.info("Server started!");

///Validate Env Params
const envParams = [
  "MAX_SESSION_TIME",
  "PORT",
  "DB_SCHEMA",
  "DB_USER",
  "DB_PASSWORD",
  "DB_PORT",
  "DB_HOST",
  "DB_CONNECTION_LIMIT",
];
function validateEnvParams() {
  envParams.forEach((envParamName) => {
    if (!process.env[envParamName]) {
      console.log("\x1b[33m%s\x1b[0m", `Missing env param: ${envParamName}`);
      logger.error(`Missing env param: ${envParamName}`);
      setTimeout(() => {
        process.exit(1);
      }, 2000);
    }
  });
}

validateEnvParams();
//// End Validate Env Params

api.use(cors());

api.use((req, res, next) => {
  var allowedOrigins = ["http://localhost:4000"];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-access-token, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: true }));
api.use(forms.array());

api.use(bodyParser.json());
///check Api connection
api.get("/health-check", (req, res, next) => {
  res.send("Api Vacation working ");
});
//end check api connection

api.use("/auth", login);
api.use("/vacation", vacation);

api.listen(process.env.PORT, () => {
  console.log(`Server is listening to Port ${process.env.PORT}`);
});
