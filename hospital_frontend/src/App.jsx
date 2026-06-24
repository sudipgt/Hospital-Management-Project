import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

import ReceptionDashboard from "./pages/ReceptionDashboard";
import PatientList from "./pages/PatientList";
import AddPatient from "./pages/AddPatient";
import BookAppointment from "./pages/BookAppointment";
import AppointmentList from "./pages/AppointmentList";

import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import PrescriptionForm from "./pages/PrescriptionForm";

import AdminDashboard from "./pages/AdminDashboard";
import AdminHistory from "./pages/AdminHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/reception"
          element={
            <ProtectedRoute allowedRoles={["reception"]}>
              <ReceptionDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception/patients"
          element={
            <ProtectedRoute allowedRoles={["reception"]}>
              <PatientList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception/add-patient"
          element={
            <ProtectedRoute allowedRoles={["reception"]}>
              <AddPatient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception/book-appointment"
          element={
            <ProtectedRoute allowedRoles={["reception"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception/appointments"
          element={
            <ProtectedRoute allowedRoles={["reception"]}>
              <AppointmentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/prescription/:appointmentId"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <PrescriptionForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception", "doctor"]}>
              <AdminHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;