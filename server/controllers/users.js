const connection = require("../database/index");
const bcrypt = require("bcryptjs");

async function isUserRegistered(userName, password) {
  const params = password ? [userName, password] : [userName];
  const passwordQuery = password ? ` AND users.password = ? ` : "";
  const query = `SELECT * FROM users where userName = ? ${passwordQuery} `;
  const [rows] = await (await connection()).execute(query, params);
  return rows[0];
}

async function isUserExist(id) {
  const [rows] = await (
    await connection()
  ).execute("SELECT * FROM users where id = ?", [id]);
  return rows[0];
}

async function createUser(userValues) {
  const { userName, firstName, lastName, password } = userValues;
  const hashPassword = bcrypt.hashSync(password, 8);
  const values = [userName, firstName, lastName, hashPassword];
  const createAccountQuery =
    "INSERT INTO `users` (`userName`, `firstName`, `lastName`, `password`) VALUES (?,?,?,?)";
  const [rows] = await (await connection()).execute(createAccountQuery, values);
  return rows.affectedRows;
}

module.exports = {
  isUserRegistered,
  isUserExist,
  createUser,
};
