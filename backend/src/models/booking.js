const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  scheduledAt: Date,
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
