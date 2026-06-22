import api from "./axios";

export const getDoctors = () => {
  return api.get("/doctors/");
};