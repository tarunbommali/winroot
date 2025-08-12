const Service = require("../models/service");


exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ message: "Service created", service });
  } catch (error) {
    res.status(500).json({ message: "Failed to create service", error: error.message });
  }
};


exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error: error.message });
  }
};


exports.updateService = async (req, res) => {
  try {
    const updates = req.body;
    const allowedFields = ["name", "description", "price", "location"]; 
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([key]) => allowedFields.includes(key))
    );

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      filteredUpdates,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service updated successfully", service: updatedService });
  } catch (error) {
    res.status(500).json({ message: "Failed to update service", error: error.message });
  }
};



exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete service", error: error.message });
  }
};
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ service });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service", error: error.message });
  }
};

