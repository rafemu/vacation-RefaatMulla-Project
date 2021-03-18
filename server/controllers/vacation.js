const connection = require("../database/index");

async function getVacations() {
  const vacationQuery = `
  SELECT 
    vacation.id AS id,
    vacation.destination AS destination,
    vacation.description AS description,
    vacation.startAt AS startAt,
    vacation.endAt AS endAt,
    vacation.price AS price,
    vacation.createdAt AS createdAt,
    vacation.updatedAt AS updatedAt,
    images.imagePath AS image
    
FROM
    vacation
        JOIN
    images ON vacation.id = vacationId`;

  const [rows] = await (await connection()).execute(vacationQuery, []);
  return rows;
}
async function createVacation(vacationDetails) {
  const { destination, description, startAt, endAt, price } = vacationDetails;
  const values = [destination, description, startAt, endAt, price];
  const createVacationQuery =
    "INSERT INTO `vacation`  (`destination`, `description`, `startAt`, `endAt`, `price`) VALUES (?,?,?,?,?)";
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

async function editVacation(vacationDetails, vacationId) {
  const { destination, description, startAt, endAt, price } = vacationDetails;
  const values = [destination, description, startAt, endAt, price, vacationId];
  const updateQuery =
    "UPDATE `vacation` SET `destination` = ?, `description` = ?, `startAt` = ?, `endAt` = ?, `price` = ? WHERE (`id` = ?);  ";
  const [rows] = await (await connection()).execute(updateQuery, values);
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
  editVacation,
  getVacations,
};
