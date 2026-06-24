import api from "./axios";

export const getAppointments = () => {
  return api.get("/appointments/");
};

export const createAppointment = (data) => {
  return api.post("/appointments/", data);
};

export const getAppointmentHistory = () => {
  return api.get("/appointments/history/");
};

export const cancelAppointment = (appointmentId) => {
  return api.patch(`/appointments/${appointmentId}/cancel/`);
};