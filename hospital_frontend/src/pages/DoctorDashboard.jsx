import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { getAppointments } from "../api/appointmentApi";
import { Link } from "react-router-dom";

function DoctorDashboard() {
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
        <h1 className="page-title">Doctor Dashboard</h1>
        <p className="page-subtitle">
          View today’s appointments and manage prescriptions
        </p>

        <div className="card-grid">
          <StatCard title="Today's Appointments" value={todaysAppointments.length} />
          <StatCard title="Pending Prescriptions" value={bookedAppointments.length} />
          <StatCard title="Completed" value={completedAppointments.length} />
          <StatCard title="Total Appointments" value={appointments.length} />
        </div>

        <div className="card table-card">
          <h3>Today's Appointments</h3>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Time</th>
                <th>Symptoms</th>
                <th>Status</th>
                <th>Action</th>
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
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.symptoms}</td>
                    <td>
                      <StatusBadge status={appointment.status} />
                    </td>
                    <td>
                      {appointment.status === "booked" ? (
                        <Link
                          className="btn btn-primary"
                          to={`/doctor/prescription/${appointment.id}`}
                        >
                          Write
                        </Link>
                      ) : (
                        "Done"
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

export default DoctorDashboard;