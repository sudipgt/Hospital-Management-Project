import api from "./axios";

export const createPrescription = (data) => {
  return api.post("/prescriptions/", data);
};