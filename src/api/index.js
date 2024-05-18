import axios from "axios";

const url = "http://localhost:3000/";

const API = axios.create({
  baseURL: url,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const studentLogin = async (formData) =>
  await API.post("students/login", formData);

export const studentSignUp = async (formData) =>
  await API.post("students/signup", formData);

export const adminLogin = (formData) => API.post("admin/login", formData);

export const adminSignUp = (formData) => API.post("admin/signup", formData);

export const interviewerLogin = (formData) =>
  API.post("interviewer/login", formData);

export const interviewerSignUp = (formData) =>
  API.post("interviewer/signup", formData);
