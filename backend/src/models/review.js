const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  rating: { type: Number, required: true },
  comment: String,
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
