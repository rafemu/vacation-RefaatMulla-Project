require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const logger = require("./logger");

logger.info("Server started!");

const envParams = ["MAX_SESSION_TIME", "PORT"];
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

api.use(cors());
api.use(bodyParser.json());

api.get("/health-check", (req, res, next) => {
  res.send("Api working");
});

api.listen(process.env.PORT, () => {
  console.log(`Server is listening to Port ${process.env.PORT}`);
});
