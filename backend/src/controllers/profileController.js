const User = require("../models/user");
const bcrypt = require("bcrypt");

// GET /me
exports.getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({ user });
};

// PUT /me
exports.updateMyProfile = async (req, res) => {
  const updates = req.body;
  const allowedFields = [
    "firstName", "lastName", "photoUrl", "phoneNumber", "address", "age", "gender"
  ];
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key))
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredUpdates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ message: "Profile updated", user: updatedUser });
};

// PATCH /me/password
exports.changeMyPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  const isMatch = await user.validatePassword(currentPassword);
  if (!isMatch) return res.status(400).json({ message: "Invalid current password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};
