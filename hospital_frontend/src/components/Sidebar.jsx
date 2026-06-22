import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">MediCare</div>

      {user?.role === "reception" && (
        <>
          <NavLink className="sidebar-link" to="/reception">
            Dashboard
          </NavLink>
          <NavLink className="sidebar-link" to="/reception/patients">
            Patients
          </NavLink>
          <NavLink className="sidebar-link" to="/reception/add-patient">
            Add Patient
          </NavLink>
          <NavLink className="sidebar-link" to="/reception/book-appointment">
            Book Appointment
          </NavLink>
          <NavLink className="sidebar-link" to="/reception/appointments">
            Appointments
          </NavLink>
        </>
      )}

      {user?.role === "doctor" && (
        <>
          <NavLink className="sidebar-link" to="/doctor">
            Dashboard
          </NavLink>
          <NavLink className="sidebar-link" to="/doctor/appointments">
            My Appointments
          </NavLink>
        </>
      )}

      {user?.role === "admin" && (
        <NavLink className="sidebar-link" to="/admin-dashboard">
          Dashboard
        </NavLink>
      )}
    </aside>
  );
}

export default Sidebar;