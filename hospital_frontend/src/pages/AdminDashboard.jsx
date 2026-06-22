import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

function AdminDashboard() {
  return (
    <Layout>
      <div className="page">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Manage hospital system setup</p>

        <div className="card-grid">
          <StatCard title="Doctors" value="Admin" />
          <StatCard title="Patients" value="View" />
          <StatCard title="Appointments" value="Track" />
          <StatCard title="System" value="Online" />
        </div>

        <div className="card">
          <h3>Doctor Management</h3>
          <p>For Version 1, create doctors from Django Admin panel.</p>

          <a className="btn btn-primary" href="http://127.0.0.1:8000/admin/" target="_blank">
            Open Django Admin
          </a>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;