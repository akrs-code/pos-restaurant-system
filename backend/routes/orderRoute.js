const express = require("express");
const router = express.Router();
const { addOrder, getOrders, getOrderById, updateOrders, updateOrderStatus } = require("../controllers/orderController");
const { isVerifiedUser } = require("../middleware/tokenVerification");

router.post("/", isVerifiedUser, addOrder);
router.get("/", isVerifiedUser, getOrders);
router.get("/:id", isVerifiedUser, getOrderById);
router.patch("/:id", isVerifiedUser, updateOrders);
router.patch("/:id", isVerifiedUser, updateOrderStatus);

module.exports = router;
