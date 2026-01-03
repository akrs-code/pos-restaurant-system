const config = require("../config/config");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../models/userModel");

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return next(createHttpError(401, "Access token not provided"));
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(accessToken, config.accessTokenSecret);
    } catch (err) {
      return next(createHttpError(401, "Invalid or expired token"));
    }

    // Check if user exists
    const user = await User.findById(decoded._id);
    if (!user) {
      return next(createHttpError(404, "User does not exist"));
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(500, "Server error in token verification"));
  }
};

module.exports = { isVerifiedUser };
