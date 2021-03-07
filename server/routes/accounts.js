const express = require("express");
const {
  createAccount,
  createAccountUser,
  getAccounts,
  getAccountById,
  updateBalance,
} = require("../controllers/account");
const { isUserExist } = require("../controllers/users");
const router = express.Router();
const getValidationFunction = require("../validations/account.validation");

// create account
router.post("/", getValidationFunction("account"), async (req, res, next) => {
  try {
    const { type } = req.body;
    const result = await isUserExist(req.body.users[0]);
    if (!result) throw new Error("Invalid User");
    console.log("createAccount");
    const generatedAccountId = _generateAccountId();
    const caResult = await createAccount({ type, id: generatedAccountId });
    if (!caResult.affectedRows) throw new Error("Account was not created");
    const cauResult = await createAccountUser(
      generatedAccountId,
      req.body.users[0],
      "Owner"
    );
    if (!cauResult.affectedRows)
      throw new Error("User Account was not created");
    res.json({ message: "account created" });
  } catch (ex) {
    res.json(ex.message);
  }

  function _generateAccountId() {
    return Math.floor(Math.random() * 99999);
  }
});

router.get(
  "/",
  getValidationFunction("getAccounts"),
  async (req, res, next) => {
    const { userId } = req.query;
    try {
      const result = await getAccounts(userId);
      res.json(result);
    } catch (ex) {
      return next({ message: "GENERAL ERROR", status: 400 });
    }
  }
);

router.get("/:accountId", async (req, res, next) => {
  const { accountId } = req.params;
  try {
    const result = await getAccountById(accountId);
    res.json(result);
  } catch (ex) {
    return next({ message: "GENERAL ERROR", status: 400 });
  }
});

router.put("/:accountId", async (req, res, next) => {
  const { accountId } = req.params;
  const { operation, amount } = req.body;
  console.log(accountId, operation, amount);
  try {
    const { balance } = await getAccountById(accountId);
    console.log(balance);
    const newAmount =
      operation == "Deposit" ? (balance = +amount) : (balance = -amount);
    const result = await updateBalance(accountId, newAmount);
    res.json(result);
  } catch (ex) {
    return next({ message: "GENERAL ERROR", status: 400 });
  }
});

module.exports = router;
