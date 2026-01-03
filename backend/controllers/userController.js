const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * Register user
 */
const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      return next(createHttpError(400, "All fields are required"));
    }

    const allowedRoles = ["cashier", "admin"]
    if (!allowedRoles.includes(role)) return next(createHttpError(400, "Invalid role"));

    const exists = await User.findOne({ email });
    if (exists) return next(createHttpError(400, "User already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, phone, email, password: hashedPassword, role });

    res.status(201).json({
      success: true,
      message: "New user created successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(createHttpError(400, "All fields are required"));

    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(401, "Invalid credentials"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(createHttpError(401, "Invalid credentials"));

    const accessToken = jwt.sign({ _id: user._id, role: user.role }, config.accessTokenSecret, { expiresIn: "1d" });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get logged-in user
 */
const getUserData = async (req, res, next) => {
  try {
    if (!req.user) return next(createHttpError(401, "Unauthorized"));

    const user = await User.findById(req.user._id).select("-password");
    if (!user) return next(createHttpError(404, "User not found"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 */
const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", { sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getUserData, logout };
