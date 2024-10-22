const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ message: "User already exist.", success: false });
    }

    const userModel = new UserModel({ name, email, password });

    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    // Generate Access and Refresh Tokens
    const accessToken = jwt.sign(
      { id: userModel._id, email: userModel.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      { id: userModel._id, email: userModel.email },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Set refresh token in cookie (httpOnly)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Signup Successful.",
      success: true,
      accessToken,
      email,
      user: name,
      redirectUrl: "/dashboard",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER ERROR !!", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "User do not exist.", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password); 

    if (!isPasswordMatch) {
      return res
        .status(403)
        .json({
          message: "Password Incorrect. Please enter the correct password.",
          success: false,
        });
    }

    // Generate Access and Refresh Tokens
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Set refresh token in cookie (httpOnly)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful.",
      success: true,
      redirectUrl: "/dashboard",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER ERROR !!", success: false });
  }
};

// Logout to Clear Cookies
const logout = (req, res) => {
  res.clearCookie("accessToken", {
    path: "/",
  });
  res.clearCookie("refreshToken", {
    path: "/",
  });
  res.status(200).json({ message: "Logout successful.", success: true });
};

module.exports = { signup, login, logout };
