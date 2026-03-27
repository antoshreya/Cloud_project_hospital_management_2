import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API endpoints
export const endpoints = {
    // Auth endpoints
    doctorLogin: '/doctor/login',
    doctorRegister: '/doctor/register',
    patientLogin: '/patient/login',
    patientRegister: '/patient/register',

    // Appointment endpoints
    createAppointment: '/appointments/create',
    getAppointments: '/appointments',
    updateAppointment: (id) => `/appointments/${id}`,
    deleteAppointment: (id) => `/appointments/${id}`,

    // Doctor endpoints
    getDoctors: '/doctor',
    getDoctorProfile: (id) => `/doctor/${id}`,
    updateDoctorProfile: (id) => `/doctor/${id}`,

    // Patient endpoints
    getPatients: '/patient',
    getPatientProfile: (id) => `/patient/${id}`,
    updatePatientProfile: (id) => `/patient/${id}`,

    // Prescription endpoints
    createPrescription: '/prescriptions/create',
    getPrescriptions: '/prescriptions',
    updatePrescription: (id) => `/prescriptions/${id}`,
};

export default api;
