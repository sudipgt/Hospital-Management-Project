import { useEffect, useState } from "react";
import { getAppointments, cancelAppointment } from "../api/appointmentApi";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  const loadAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.log("Failed to load appointments", error);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      await cancelAppointment(appointmentId);
      setMessage("Appointment cancelled successfully");
      loadAppointments();
    } catch (error) {
      setMessage("Failed to cancel appointment");
      console.log("Cancel appointment error", error);
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Appointments</h1>
        <p className="page-subtitle">Active hospital appointments</p>

        {message && <div className="message">{message}</div>}

        <div className="card table-card">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Symptoms</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="8">No active appointments found</td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.patient_name}</td>
                    <td>{appointment.doctor_name}</td>
                    <td>{appointment.appointment_date}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.symptoms}</td>
                    <td>
                      <StatusBadge status={appointment.status} />
                    </td>
                    <td>
                      {user?.role === "reception" && appointment.status === "booked" ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AppointmentList;