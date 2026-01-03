const express = require("express");
const router = express.Router();
const { addMultipleTables, getTables, updateTable } = require("../controllers/tableController");
const { isVerifiedUser } = require("../middleware/tokenVerification");

router.post("/add-multiple", isVerifiedUser, addMultipleTables);
router.get("/", isVerifiedUser, getTables);
router.patch("/:id", isVerifiedUser, updateTable);

module.exports = router;
