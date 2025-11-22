import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { getUsers, deleteUser, updateRole } from "../controllers/userController.js";
// import userController from "../controllers/userController.js";

const router = express.Router();
// const { getUsers, deleteUser, updateRole } = import ("../controllers/userController");
// const { getUsers, deleteUser, updateRole } = userController;

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id/access", updateRole);

 
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, access } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      access: access || "user",  
    });

    await newUser.save();

    return res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        access: user.access, //  added
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});




export default router;
