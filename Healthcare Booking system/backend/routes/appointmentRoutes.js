import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// ✅ GET all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST: Create a new appointment
// ✅ POST route to create a new appointment
router.post("/", async (req, res) => {
  console.log("📥 Incoming POST data:", req.body); // <- Debug log

  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: "Appointment created", appointment });
  } catch (err) {
    console.error("❌ Failed to create appointment:", err.message);
    res.status(400).json({ error: "Failed to create appointment" });
  }
});



// ✅ PUT: Update appointment status
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// ✅ DELETE all appointments
router.delete("/", async (req, res) => {
  try {
    await Appointment.deleteMany();
    res.json({ message: "All appointments cleared." });
  } catch (err) {
    console.error("Error deleting appointments:", err);
    res.status(500).json({ error: "Failed to delete appointments" });
  }
});

export default router;
