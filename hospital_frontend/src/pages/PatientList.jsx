import { useEffect, useState } from "react";
import { getPatients } from "../api/patientApi";
import Layout from "../components/Layout";

function PatientList() {
  const [patients, setPatients] = useState([]);

  const loadPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.log("Failed to load patients", error);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Patients</h1>
        <p className="page-subtitle">All registered patients</p>

        <div className="card table-card">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Blood Group</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.blood_group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default PatientList;