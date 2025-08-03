const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  brand: String,
  imageUrls: [String],
  inStock: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
