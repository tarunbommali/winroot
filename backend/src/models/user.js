const mongoose = require("mongoose");
const validator = require("validator");
const isURL = require("validator/lib/isURL");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, maxlength: 50, minlength: 2 },
    lastName: { type: String, required: true, maxlength: 50, minlength: 2 },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password: " + value);
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isMobilePhone(value, "any")) {
          throw new Error("Invalid phone number: " + value);
        }
      },
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    role: {
      type: String,
      enum: ["user", "superadmin", "admin", "service_provider"],
      default: "user",
    },
    isVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "active",
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    walletBalance: { type: Number, default: 0 },
    lastLogin: { type: Date },
    joinedFrom: { type: String, default: "website" },

    photoUrl: {
      type: String,
      default: "default.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL: " + value);
        }
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    age: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

// Generate JWT Token
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// Validate password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  return await bcrypt.compare(passwordInputByUser, this.password);
};

module.exports = mongoose.model("User", userSchema);
