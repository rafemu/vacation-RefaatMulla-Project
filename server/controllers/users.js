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

async function changePassword(id, newPassword) {
  const hashPassword = bcrypt.hashSync(newPassword, 8);
  const updateQuery = "UPDATE `users` SET `password` = ? WHERE (`id` = ?);";
  const [rows] = await (await connection()).execute(updateQuery, [
    hashPassword,
    id,
  ]);
  return rows.affectedRows;
}

async function getUsers() {
  const getQuery = "SELECT * FROM bank_db.users";
  const [rows] = await (await connection()).execute(getQuery);
  return rows;
}

async function getUsersWithAccounts() {
  const getQuery = `SELECT 
    distinct(bank_db.users.email) , bank_db.users.firstName, bank_db.users.id as id
    FROM
    bank_db.users
        JOIN
    bank_db.accounts_users ON bank_db.users.id = bank_db.accounts_users.userId`;
  const [rows] = await (await connection()).execute(getQuery);
  return rows;
}

module.exports = {
  isUserRegistered,
  isUserExist,
  createUser,
  changePassword,
  getUsers,
  getUsersWithAccounts,
};
