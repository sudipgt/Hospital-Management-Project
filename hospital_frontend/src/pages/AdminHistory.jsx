import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";
import { getAppointmentHistory } from "../api/appointmentApi";

function AdminHistory() {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const response = await getAppointmentHistory();
      setHistory(response.data);
    } catch (error) {
      console.log("Failed to load history", error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Patient History</h1>
        <p className="page-subtitle">
          Completed appointments with diagnosis and prescription details
        </p>

        <div className="card table-card">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Diagnosis</th>
                <th>Medicines</th>
                <th>Advice</th>
                <th>Follow-up</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="11">No completed appointment history found</td>
                </tr>
              ) : (
                history.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.patient_name}</td>
                    <td>{item.patient_phone}</td>
                    <td>{item.doctor_name}</td>
                    <td>{item.appointment_date}</td>
                    <td>{item.symptoms}</td>
                    <td>{item.diagnosis}</td>
                    <td>{item.medicines}</td>
                    <td>{item.advice}</td>
                    <td>{item.follow_up_date || "-"}</td>
                    <td>
                      <StatusBadge status={item.status} />
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

export default AdminHistory;