import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { getPatients } from "../api/patientApi";
import { getAppointments } from "../api/appointmentApi";

function ReceptionDashboard() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const loadDashboardData = async () => {
    try {
      const patientsResponse = await getPatients();
      const appointmentsResponse = await getAppointments();

      setPatients(patientsResponse.data);
      setAppointments(appointmentsResponse.data);
    } catch (error) {
      console.log("Failed to load reception dashboard data", error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todaysAppointments = appointments.filter(
    (appointment) => appointment.appointment_date === today
  );

  const bookedAppointments = appointments.filter(
    (appointment) => appointment.status === "booked"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Reception Dashboard</h1>
        <p className="page-subtitle">
          Manage patients, appointments, and daily hospital activity
        </p>

        <div className="card-grid">
          <StatCard title="Total Patients" value={patients.length} />
          <StatCard title="Today's Appointments" value={todaysAppointments.length} />
          <StatCard title="Pending Appointments" value={bookedAppointments.length} />
          <StatCard title="Completed Appointments" value={completedAppointments.length} />
        </div>

        <div className="card table-card">
          <h3>Today's Appointments</h3>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Time</th>
                <th>Symptoms</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {todaysAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6">No appointments for today</td>
                </tr>
              ) : (
                todaysAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.patient_name}</td>
                    <td>{appointment.doctor_name}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.symptoms}</td>
                    <td>
                      <StatusBadge status={appointment.status} />
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

export default ReceptionDashboard;