require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
api.use(express.json());
api.use(cors());
const httpServer = require("http").createServer(api);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

require("./socket/vacation-socket")(io);

const logger = require("./logger");

//routes
const login = require("./routes/login");
const vacation = require("./routes/vacation");

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

api.use(express.static("images"));

// api.use((req, res, next) => {
//   var allowedOrigins = ["http://localhost:3000", "*"];
//   var origin = req.headers.origin;
//   if (allowedOrigins.indexOf(origin) > -1) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Content-Type, Accept"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

// parse requests of content-type - application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }));

api.use(bodyParser.json());
///check Api connection
api.get("/health-check", (req, res, next) => {
  res.send("Api Vacation working ");
});
//end check api connection

api.use("/auth", login);
api.use("/vacation", vacation);

api.use((error, req, res, next) => {
  console.log("error handler", error);
  const status = error.status || 500;
  res.status(status).json(error.message);
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is listening to Port ${process.env.PORT}`);
});
