const Product = require("./models/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};
