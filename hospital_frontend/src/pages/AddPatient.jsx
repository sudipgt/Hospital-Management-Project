import { useState } from "react";
import { createPatient } from "../api/patientApi";
import Layout from "../components/Layout";

function AddPatient() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "male",
    phone: "",
    email: "",
    address: "",
    blood_group: "",
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
      await createPatient(form);
      setMessage("Patient created successfully");

      setForm({
        name: "",
        age: "",
        gender: "male",
        phone: "",
        email: "",
        address: "",
        blood_group: "",
      });
    } catch (error) {
      setMessage("Failed to create patient");
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Add Patient</h1>
        <p className="page-subtitle">Register a new patient</p>

        <div className="card form-card">
          {message && <div className="message">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input className="input" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input className="input" name="age" type="number" value={form.age} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select className="input" name="gender" value={form.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input className="input" name="phone" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="patient@example.com"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea className="input" name="address" value={form.address} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <input className="input" name="blood_group" value={form.blood_group} onChange={handleChange} />
            </div>

            <button className="btn btn-primary" type="submit">
              Create Patient
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddPatient;