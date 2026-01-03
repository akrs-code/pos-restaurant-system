const express = require("express");
const router = express.Router();
const { register, login, getUserData, logout } = require("../controllers/userController");
const { isVerifiedUser } = require("../middleware/tokenVerification");

router.post("/register", register);
router.post("/login", login);
router.get("/", isVerifiedUser, getUserData);
router.post("/logout", isVerifiedUser, logout);

module.exports = router;
