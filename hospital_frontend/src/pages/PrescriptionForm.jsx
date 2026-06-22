import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPrescription } from "../api/prescriptionApi";
import Layout from "../components/Layout";

function PrescriptionForm() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    appointment: appointmentId,
    diagnosis: "",
    medicines: "",
    advice: "",
    follow_up_date: "",
  });

  const [message, setMessage] = useState("");

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
      await createPrescription(form);
      setMessage("Prescription saved successfully");

      setTimeout(() => {
        navigate("/doctor/appointments");
      }, 1000);
    } catch (error) {
      setMessage("Failed to save prescription");
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Write Prescription</h1>
        <p className="page-subtitle">Appointment ID: {appointmentId}</p>

        <div className="card form-card">
          {message && <div className="message">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Diagnosis</label>
              <textarea
                className="input"
                name="diagnosis"
                value={form.diagnosis}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Medicines</label>
              <textarea
                className="input"
                name="medicines"
                value={form.medicines}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Advice</label>
              <textarea
                className="input"
                name="advice"
                value={form.advice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Follow-up Date</label>
              <input
                className="input"
                type="date"
                name="follow_up_date"
                value={form.follow_up_date}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Save Prescription
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default PrescriptionForm;