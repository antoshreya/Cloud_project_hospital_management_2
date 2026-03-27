import express from "express";
import bcrypt from "bcryptjs";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// ✅ Sign Up (with password hashing)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    // Check if the email already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({ name, email, password: hashedPassword, specialization });
    await doctor.save();
    res.status(201).json({ message: "Signup successful!", doctor });
  } catch (err) {
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

// ✅ Sign In (with password verification)
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.json({ message: "Signin successful!", doctor });
  } catch (err) {
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

export default router;
