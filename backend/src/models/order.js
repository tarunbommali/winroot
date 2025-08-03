const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    }
  ],
  totalAmount: Number,
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  status: { type: String, enum: ["placed", "shipped", "delivered"], default: "placed" },
  address: Object,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
