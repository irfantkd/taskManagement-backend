const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailcheck = await UserModel.findOne({ email });
    const nameCheck = await UserModel.findOne({ name });

    if (emailcheck || nameCheck) {
      return res.status(401).json({
        error: true,
        message: "User is already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).json({
      error: false,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.keys(error.errors).map((field) => ({
        field,
        message: error.errors[field].message,
      }));

      return res.status(400).json({
        error: true,
        message: "Validation failed",
        details: validationErrors,
      });
    }

    res.status(500).json({
      error: true,
      message: "Internal server error",
      detail: error.message,
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (user === null) {
      return res.status(401).json({
        error: true,
        message: "Name or Password is incorrect",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword === false) {
      return res.status(401).json({
        error: true,
        message: "Name or Password is incorect",
      });
    }

    const accessToken = await jwt.sign(
      { userid: user._id },
      process.env.SECURITY_KEY,
      { expiresIn: "1m" }
    );

    res.status(200).json({
      error: false,
      message: "successfully login",
      user: user,
      Token: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      message: "internal server error",
    });
  }
};

// verifyToken and user

const verifyToken = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required",
      });
    }

    await jwt.verify(token, process.env.SECURITY_KEY);

    res.status(200).json({
      error: false,
      message: "Token is valid",
    });
  } catch (error) {
    res.status(401).json({
      error: true,
      message: "Invalid or expired token",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
};
