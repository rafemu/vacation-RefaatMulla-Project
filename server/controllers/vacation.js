const { func } = require("@hapi/joi");
const connection = require("../database/index");

async function createVacation(vacationDetails) {
  const { destination, description, from, to, price } = vacationDetails;
  const values = [destination, description, from, to, price];
  const createVacationQuery =
    "INSERT INTO `vacation`  (`destination`, `description`, `from`, `to`, `price`) VALUES (?,?,?,?,?)";
  const [rows] = await (await connection()).execute(
    createVacationQuery,
    values
  );
  return rows.insertId;
}
async function insertPhotoToDB(filePath, id) {
  const PhotoQuery =
    "INSERT INTO `images`  (`imagePath`,`vacationId`) VALUES (?,?)";
  const [rows] = await (await connection()).execute(PhotoQuery, [filePath, id]);
  return rows.affectedRows;
}

async function followVacation(userId, vacationIdta) {
  const followQuery =
    "INSERT INTO `followers`  (`userId`,`vacationId`) VALUES (?,?)";
  const [rows] = await (await connection()).execute(followQuery, [
    userId,
    vacationIdta,
  ]);
  return rows.affectedRows;
}

module.exports = {
  createVacation,
  insertPhotoToDB,
  followVacation,
};
