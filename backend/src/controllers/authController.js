const bcrypt = require("bcrypt");
const User = require("../models/user");
const { ValidationSignUp } = require("../utils/validation");

exports.signupController = async (req, res) => {
  const {
    firstName,
    lastName,
    emailId,
    password,
    phoneNumber,
    age,
    gender,
    photoUrl,
    address,
    role,
    joinedFrom
  } = req.body;

  try {
    const errors = ValidationSignUp(req.body);

    // Check if email or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ emailId }, { phoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone number already exists" });
    }

    // If validation errors exist
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      phoneNumber,
      age,
      gender,
      photoUrl,
      address,      // expects { street, city, state, postalCode, country }
      role: role || "user", // default to "user"
      joinedFrom: joinedFrom || "website",
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        emailId: newUser.emailId,
        phoneNumber: newUser.phoneNumber,
        age: newUser.age,
        gender: newUser.gender,
        photoUrl: newUser.photoUrl,
        address: newUser.address,
        role: newUser.role,
        joinedFrom: newUser.joinedFrom,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};
exports.loginController = async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await user.getJWT();

    // Update lastLogin time
    user.lastLogin = new Date();
    await user.save();

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Use true in production (HTTPS)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        phoneNumber: user.phoneNumber,
        age: user.age,
        gender: user.gender,
        photoUrl: user.photoUrl,
        address: user.address,
        role: user.role,
        isVerified: user.isVerified,
        status: user.status,
        walletBalance: user.walletBalance,
        lastLogin: user.lastLogin,
        joinedFrom: user.joinedFrom,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};


exports.logoutController = async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.status(200).json({ message: "Logout Successful!" });
};
