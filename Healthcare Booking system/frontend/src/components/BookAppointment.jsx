import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const doctors = [
  {
    id: 1,
    name: "Dr. Arjun",
    specialty: "Cardiologist",
    description: "Expert in heart-related treatments with 10+ years of experience.",
    image: "https://as2.ftcdn.net/v2/jpg/07/07/89/33/1000_F_707893394_5DEhlBjWOmse1nyu0rC9T7ZRvsAFDkYC.webp",
  },
  {
    id: 2,
    name: "Dr. Sarah",
    specialty: "Dermatologist",
    description: "Specialist in skin treatments and cosmetic dermatology.",
    image: "https://thumbs.dreamstime.com/z/indian-beautiful-female-doctor-18398918.jpg?ct=jpeg",
  },
  {
    id: 3,
    name: "Dr. Sruthi",
    specialty: "Orthopedic Surgeon",
    description: "Focused on bone and joint care with advanced surgical expertise.",
    image: "https://thumbs.dreamstime.com/z/young-indian-female-doctor-holding-red-heart-shape-happy-77438932.jpg?ct=jpeg",
  },
  {
    id: 4,
    name: "Dr. Ravi",
    specialty: "Neurologist",
    description: "Expert in treating brain and nervous system disorders.",
    image: "https://media.istockphoto.com/id/1298800629/photo/portrait-of-confident-male-doctor-looking-at-camera.webp?s=1024x1024&w=is&k=20&c=YZqLotGgfGkQMmLrsanq56g-z5yWFOhovcGlBz20KPQ=",
  },
  {
    id: 5,
    name: "Dr. Ananya",
    specialty: "Pediatrician",
    description: "Dedicated to child healthcare and wellness.",
    image: "https://media.istockphoto.com/id/671290874/photo/portrait-of-a-female-doctor.jpg?s=1024x1024&w=is&k=20&c=iCS-mx309tZzltN6rKoCyy20F2UFLAYfDD89awBEOqE=",
  },
  {
    id: 6,
    name: "Dr. Venkatesh",
    specialty: "General Physician",
    description: "Provides general medical care and primary health services.",
    image: "https://media.istockphoto.com/id/2195547864/photo/happy-senior-doctor-in-white-lab-coat-posing-at-workplace.jpg?s=1024x1024&w=is&k=20&c=Ud0gdovEOEMy83-9obKOoU78YTFuHRFrGpPPAgjEM10=",
  },
  {
    id: 7,
    name: "Dr. Meera Kapoor",
    specialty: "Gynecologist",
    description: "Specialized in women’s health and prenatal care.",
    image: "https://thumbs.dreamstime.com/z/smiling-female-doctor-holding-clipboard-smiling-female-doctor-holding-clipboard-white-background-293415448.jpg?ct=jpeg",
  },
  {
    id: 8,
    name: "Dr. Abdul Rahman",
    specialty: "ENT Specialist",
    description: "Experienced in ear, nose, and throat treatments.",
    image: "https://thumbs.dreamstime.com/z/vertical-portrait-male-happy-indian-doctor-standing-clinic-hospital-smiling-happy-male-indian-latin-doctor-medical-worker-228700065.jpg?ct=jpeg",
  },
  {
    id: 9,
    name: "Dr. Priya Nair",
    specialty: "Psychiatrist",
    description: "Helping patients achieve mental wellness through compassionate care.",
    image: "https://c7.alamy.com/comp/W4EW6Y/indian-female-doctor-standing-with-her-arms-crossed-and-smiling-W4EW6Y.jpg",
  },
];

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    diagnosis: "",
  });

  const [patientDetails, setPatientDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [selectedTab, setSelectedTab] = useState("form");
  const [calendarEvents, setCalendarEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setCalendarEvents(storedAppointments);
  }, []);

  const handleChange = (e) => {
    if (["name", "email", "phone"].includes(e.target.name)) {
      setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const selectDoctor = (doctorName) => {
    setFormData((prevData) => ({ ...prevData, doctor: doctorName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { doctor, date, time, diagnosis } = formData;
    const { name, email, phone } = patientDetails;

    if (!doctor || !date || !time || !diagnosis || !name || !email || !phone) {
      alert("Please fill all the fields!");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctor,
      date,
      time,
      diagnosis,
      status: "Pending",
      patient: patientDetails,
    };

    const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    existingAppointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(existingAppointments));

    setCalendarEvents((prevEvents) => [...prevEvents, newAppointment]);

    alert(`Appointment request with ${doctor} sent successfully!`);
    navigate("/patient-dashboard");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{
        backgroundImage:
          "url('https://www.softclinicsoftware.com/wp-content/uploads/2022/04/digital-composite-doctor-with-white-graph-with-flare-against-blurry-background-with-light-blue-overlay.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white/80 backdrop-blur-lg p-12 rounded-2xl shadow-2xl w-full max-w-7xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-700">Book an Appointment</h2>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            className={`py-2 px-6 text-lg font-semibold ${selectedTab === "form" ? "border-b-2 border-blue-500 text-blue-700" : "text-gray-600"}`}
            onClick={() => setSelectedTab("form")}
          >
            Book Appointment
          </button>
          <button
            className={`py-2 px-6 text-lg font-semibold ${selectedTab === "calendar" ? "border-b-2 border-blue-500 text-blue-700" : "text-gray-600"}`}
            onClick={() => setSelectedTab("calendar")}
          >
            Availability Calendar
          </button>
        </div>

        {/* Form Tab */}
        {selectedTab === "form" && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition duration-300 border"
                >
                  <img src={doctor.image} alt={doctor.name} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-blue-800">{doctor.name}</h3>
                    <span className="inline-block mt-2 mb-4 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {doctor.specialty}
                    </span>
                    <p className="text-gray-600 text-md mb-4">{doctor.description}</p>
                    <button
                      onClick={() => selectDoctor(doctor.name)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition"
                    >
                      Select Doctor
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-10 shadow-xl rounded-2xl border border-gray-200 space-y-6">
              <h3 className="text-3xl font-bold mb-6 text-blue-700">Appointment Details</h3>
              <input type="text" name="doctor" value={formData.doctor} readOnly className="w-full p-4 border rounded-lg bg-gray-100 text-lg" placeholder="Selected Doctor" />
              <input type="text" name="name" onChange={handleChange} className="w-full p-4 border rounded-lg text-lg" placeholder="Your Name" required />
              <input type="email" name="email" onChange={handleChange} className="w-full p-4 border rounded-lg text-lg" placeholder="Email" required />
              <input type="text" name="phone" onChange={handleChange} className="w-full p-4 border rounded-lg text-lg" placeholder="Phone" required />
              <textarea name="diagnosis" onChange={handleChange} className="w-full p-4 border rounded-lg text-lg" rows={3} placeholder="Diagnosis" required></textarea>
              <input type="date" name="date" onChange={handleChange} className="w-full p-4 border rounded-lg text-lg" required />
              <input type="time" name="time" onChange={handleChange} className="w-full p-4 border rounded-lg text-lg" required />
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl text-xl font-bold hover:opacity-90 transition">
                Book Appointment
              </button>
            </form>
          </>
        )}

        {/* Calendar Tab */}
        {selectedTab === "calendar" && (
          <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              height="auto"
              events={calendarEvents.map((appt) => ({
                title: `${appt.doctor} - ${appt.patient.name}`,
                start: `${appt.date}T${appt.time}`,
                allDay: false,
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
