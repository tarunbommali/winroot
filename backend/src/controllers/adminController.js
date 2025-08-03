const bcrypt = require("bcryptjs");
const Moderator = require("../models/moderators");
const { generateRandomCredentials } = require("../utils/helpers");

// POST /admin/create-user — Create Moderator
const createUser = async (req, res) => {
  try {
    const { name, email, role, type } = req.body;

    // Validation
    if (!name || !email || !role) {
      return res.status(400).json({ message: "Name, email, and role are required." });
    }

    if (role !== "moderator") {
      return res.status(400).json({ message: "This route only supports moderator creation." });
    }

    // Validate moderator type
    if (!["services", "product"].includes(type)) {
      return res.status(400).json({ message: "Moderator type must be either 'services' or 'product'." });
    }

    // Check if email already exists
    const existing = await Moderator.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered as a moderator." });
    }

    // Generate random username and password
    const { username, password } = generateRandomCredentials();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create moderator
    const moderator = new Moderator({
      name,
      email,
      username,
      password: hashedPassword,
      role,
      type,
      createdBy: req.user.id, // assuming checkAuth sets req.user
    });

    await moderator.save();

    // Return user credentials only once
    res.status(201).json({
      message: "Moderator created successfully.",
      credentials: {
        username,
        password, // show raw password once
        role,
        type,
      },
    });
  } catch (error) {
    console.error("Moderator Creation Error:", error);
    res.status(500).json({ message: "Server error during moderator creation." });
  }
};

module.exports = {
  createUser,
};
