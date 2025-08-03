const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  duration: String,
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ratings: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
