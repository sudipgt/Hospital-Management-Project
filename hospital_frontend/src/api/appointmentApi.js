import api from "./axios";

export const getAppointments = () => {
  return api.get("/appointments/");
};

export const createAppointment = (data) => {
  return api.post("/appointments/", data);
};