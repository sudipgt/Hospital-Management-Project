import api from "./axios";

export const getPatients = () => {
  return api.get("/patients/");
};

export const createPatient = (data) => {
  return api.post("/patients/", data);
};