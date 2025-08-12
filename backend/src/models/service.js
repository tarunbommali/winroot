const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
   price: { type: Number, required: true },
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   location: { type: String, required: true },
   rating: { type: Number, min: 0, max: 5 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
