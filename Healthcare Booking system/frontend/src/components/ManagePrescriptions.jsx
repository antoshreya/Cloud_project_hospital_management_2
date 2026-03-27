import { useState } from "react";

const ManagePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patient, setPatient] = useState("");
  const [medicine, setMedicine] = useState("");

  const addPrescription = (e) => {
    e.preventDefault();
    setPrescriptions([...prescriptions, { patient, medicine }]);
    setPatient("");
    setMedicine("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Manage Prescriptions</h2>

      <form onSubmit={addPrescription} className="mb-4">
        <input
          type="text"
          placeholder="Patient Name"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          placeholder="Medicine"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
          Add Prescription
        </button>
      </form>

      <ul className="list-disc pl-6">
        {prescriptions.map((presc, index) => (
          <li key={index} className="border p-2">{presc.patient} - {presc.medicine}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePrescriptions;
