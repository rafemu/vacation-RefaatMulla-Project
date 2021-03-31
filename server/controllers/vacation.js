const connection = require("../database/index");
const fs = require("fs");
async function getVacations(userId) {
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
  images.imagePath AS image,
  followers.vacation_Id AS vacationId,
  COUNT(vacation_Id) AS numberOfFollowers,
  IFNULL(GROUP_CONCAT(DISTINCT followers.user_Id
              ORDER BY (followers.user_Id = ?) DESC
              SEPARATOR ','),
          0) AS followerUsers
FROM
  followers
      RIGHT JOIN
  vacation ON followers.vacation_Id = vacation.id
      RIGHT JOIN
  images ON vacation.id = images.vacationId
GROUP BY id , destination , description , startAt , endAt , price , createdAt , image
ORDER BY followerUsers = ? desc



`;

  const [rows] = await (await connection()).execute(vacationQuery, [
    userId,
    userId,
  ]);
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

async function updatePhotoToDB(filePath, vacationId) {
  const PhotoQuery =
    "UPDATE images SET `imagePath` = ? WHERE (`vacationId` =?);";
  const [rows] = await (await connection()).execute(PhotoQuery, [
    filePath,
    vacationId,
  ]);
  return rows.affectedRows;
}

async function editVacation(vacationDetails, vacationId) {
  console.log("test");
  const { destination, description, startAt, endAt, price } = vacationDetails;
  const values = [destination, description, startAt, endAt, price, vacationId];
  const updateQuery =
    "UPDATE `vacation` SET `destination` = ?, `description` = ?, `startAt` = ?, `endAt` = ?, `price` = ? WHERE (`id` = ?);  ";
  const [rows] = await (await connection()).execute(updateQuery, values);
  return rows.affectedRows;
}

async function deleteVacationById(vacationId) {
  const deleteQuery = "DELETE FROM vacation WHERE (id = ?);";
  const [rows] = await (await connection()).execute(deleteQuery, [vacationId]);
  return rows.affectedRows;
}

async function getVacationById(vacationId) {
  const getVacationByIdQuery = `SELECT vacation.id As id,
     vacation.destination As destination,
     vacation.description As description,
     vacation.startAt As startAt,
     vacation.endAt As endAt,
     vacation.price As price,
     vacation.createdAt As createdAt,
     vacation.updatedAt As updatedAt,
     images.imagePath As imagePath,
     users.firstName
     FROM vacation 
     Join images on vacation.id = images.vacationId
     left join followers on vacation.id = followers.vacation_Id
     left join users on followers.user_id = users.id
     where vacation.id = ?`;
  const [rows] = await (await connection()).execute(getVacationByIdQuery, [
    vacationId,
  ]);
  return rows[0];
}

async function followVacation(userId, vacationIdta) {
  const followQuery =
    "INSERT INTO `followers`  (`user_Id`,`vacation_Id`) VALUES (?,?)";
  const [rows] = await (await connection()).execute(followQuery, [
    userId,
    vacationIdta,
  ]);
  return rows.affectedRows;
}

async function isFollowAlreadyExist(vacation_Id, id) {
  const [rows] = await (
    await connection()
  ).execute("SELECT * FROM followers where vacation_Id = ? AND user_Id = ?", [
    vacation_Id,
    id,
  ]);
  return rows[0];
}

async function unFollowVacation(vacation_Id, id) {
  const [rows] = await (
    await connection()
  ).execute("DELETE FROM followers where vacation_Id = ? AND user_Id = ?", [
    vacation_Id,
    id,
  ]);
  return rows.affectedRows;
}

function _deleteImageFromStorage(imgPath) {
  const filePath = imgPath;
  if (fs.existsSync(filePath)) {
    const deleteImage = fs.unlinkSync(filePath);
  }
  return true;
}

module.exports = {
  createVacation,
  insertPhotoToDB,
  followVacation,
  editVacation,
  getVacations,
  deleteVacationById,
  getVacationById,
  _deleteImageFromStorage,
  updatePhotoToDB,
  isFollowAlreadyExist,
  unFollowVacation,
};
