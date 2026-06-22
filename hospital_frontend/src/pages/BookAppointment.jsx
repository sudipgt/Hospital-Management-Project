import { useEffect, useState } from "react";
import { getPatients } from "../api/patientApi";
import { getDoctors } from "../api/doctorApi";
import { createAppointment } from "../api/appointmentApi";
import Layout from "../components/Layout";

function BookAppointment() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    appointment_date: "",
    appointment_time: "",
    symptoms: "",
    status: "booked",
  });

  const loadData = async () => {
    try {
      const patientsResponse = await getPatients();
      const doctorsResponse = await getDoctors();

      setPatients(patientsResponse.data);
      setDoctors(doctorsResponse.data);
    } catch (error) {
      console.log("Failed to load data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await createAppointment(form);
      setMessage("Appointment booked successfully");

      setForm({
        patient: "",
        doctor: "",
        appointment_date: "",
        appointment_time: "",
        symptoms: "",
        status: "booked",
      });
    } catch (error) {
      setMessage("Failed to book appointment");
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Book Appointment</h1>
        <p className="page-subtitle">Schedule a patient appointment</p>

        <div className="card form-card">
          {message && <div className="message">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Patient</label>
              <select className="input" name="patient" value={form.patient} onChange={handleChange} required>
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.phone}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Doctor</label>
              <select className="input" name="doctor" value={form.doctor} onChange={handleChange} required>
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.doctor_name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input className="input" type="date" name="appointment_date" value={form.appointment_date} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input className="input" type="time" name="appointment_time" value={form.appointment_time} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Symptoms</label>
              <textarea className="input" name="symptoms" value={form.symptoms} onChange={handleChange} />
            </div>

            <button className="btn btn-primary" type="submit">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default BookAppointment;