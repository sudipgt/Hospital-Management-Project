import api from "./axios";

export const loginApi = (username, password) => {
  return api.post("/auth/login/", {
    username,
    password,
  });
};

export const meApi = () => {
  return api.get("/auth/me/");
};