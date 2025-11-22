import express from "express";
import User from "../models/user.js";
import Bus from "../models/bus.js";

const router = express.Router();


// ✅ Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update user role (access field)
router.put("/users/:id/role", async (req, res) => {
  try {
    const { access } = req.body; // "user" | "conductor" | "admin"
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { access },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Get all buses
router.get("/buses", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create new bus
router.post("/buses", async (req, res) => {
  try {
    const { routeName, busNo, timing } = req.body;
    const bus = new Bus({
      routeName,
      busNo,
      timing,
      isOccupied: false,
    });
    await bus.save();
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete bus
router.delete("/buses/:id", async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
