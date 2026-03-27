import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  diagnosis: { type: String }
});

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  appointments: { type: [appointmentSchema], default: [] }
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
