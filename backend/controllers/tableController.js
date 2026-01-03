const Table = require("../models/tableModel");
const createHttpError = require("http-errors");

/**
 * Add multiple tables
 */
const addMultipleTables = async (req, res, next) => {
  try {
    const { number } = req.body;
    if (!Number.isInteger(number) || number <= 0)
      return next(createHttpError(400, "Invalid number of tables"));

    const existingTables = await Table.find().sort({ tableNo: -1 }).limit(1);
    let startNo = existingTables[0]?.tableNo || 0;

    const tablesToAdd = [];
    for (let i = 1; i <= number; i++) {
      tablesToAdd.push({ tableNo: startNo + i, status: "Available", currentOrder: null });
    }

    const created = await Table.insertMany(tablesToAdd);

    res.status(201).json({
      success: true,
      message: `${number} table(s) added successfully`,
      data: created,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all tables
 */
const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().populate({
      path: "currentOrder",
      select: "customerDetails orderStatus",
    });
    res.status(200).json({ success: true, data: tables });
  } catch (err) {
    next(err);
  }
};

/**
 * Update table
 */
const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const { id } = req.params;

    const updated = await Table.findByIdAndUpdate(
      id,
      {
        ...(status && { status }),
        ...(orderId !== undefined && { currentOrder: orderId || null }),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Table updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addMultipleTables, getTables, updateTable };
