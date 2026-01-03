const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

/**
 * Create order and assign table
 */
const addOrder = async (req, res, next) => {
  try {
    const { customerDetails, items, bills, table, orderStatus } = req.body;

    if (!customerDetails || !Array.isArray(items) || items.length === 0 || !bills) {
      return next(createHttpError(400, "Missing required order fields"));
    }

    if (table && !mongoose.Types.ObjectId.isValid(table)) {
      return next(createHttpError(400, "Invalid table ID"));
    }

    const allowedStatuses = ["Pending", "Processing", "Completed", "Cancelled"];
    const status = orderStatus || "Pending";

    if (!allowedStatuses.includes(status)) {
      return next(createHttpError(400, "Invalid order status"));
    }

    let tableDoc = null;

    if (table) {
      tableDoc = await Table.findById(table);
      if (!tableDoc) return next(createHttpError(404, "Table not found"));
      if (tableDoc.status === "Occupied") return next(createHttpError(400, "Table is already occupied"));
    }

    const order = await Order.create({
      customerDetails,
      items,
      bills,
      table,
      orderStatus: status,
    });

    if (tableDoc) {
      tableDoc.status = "Occupied";
      tableDoc.currentOrder = order._id;
      await tableDoc.save();
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single order
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(404, "Invalid order ID"));

    const order = await Order.findById(id).populate("table");
    if (!order) return next(createHttpError(404, "Order not found"));

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all orders
 */
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("table", "tableNo")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

/**
 * Update order status and handle table release
 */
const updateOrders = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(404, "Invalid order ID"));

    if (!orderStatus) return next(createHttpError(400, "Order status is required"));

    const allowedStatuses = ["Pending", "Processing", "Completed", "Cancelled"];
    if (!allowedStatuses.includes(orderStatus)) return next(createHttpError(400, "Invalid order status"));

    const order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
    if (!order) return next(createHttpError(404, "Order not found"));

    // Release table if order is completed or cancelled
    if (["Completed", "Cancelled"].includes(orderStatus) && order.table) {
      const tableDoc = await Table.findById(order.table);
      if (tableDoc) {
        tableDoc.status = "Available";
        tableDoc.currentOrder = null;
        await tableDoc.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrders, updateOrderStatus };
