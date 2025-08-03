const mongoose = require("mongoose");

const moderatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["moderator"],
      default: "moderator",
    },

    type: {
      type: String,
      enum: ["services", "product"],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // or "User" depending on who creates it
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Moderator", moderatorSchema);
