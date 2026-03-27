import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// ✅ Sign Up
router.post("/signup", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send({ message: "Signup successful!" });
  } catch (err) {
    res.status(400).send({ error: "Email already exists or invalid data." });
  }
});

// ✅ Sign In
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    res.json({ message: "Signin successful!", patient });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
});

export default router;
