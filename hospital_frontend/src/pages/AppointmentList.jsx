import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointmentApi";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

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

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Appointments</h1>
        <p className="page-subtitle">All hospital appointments</p>

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
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AppointmentList;