import axios from "axios";

const url = "http://dkte-interview-portal-api.vercel.app/";

const API = axios.create({
  baseURL: url,
});

API.interceptors.request.use((req) => {
  const adminAuthToken = localStorage.getItem("adminAuthToken");
  const studentAuthToken = localStorage.getItem("studentAuthToken");
  const interviewerAuthToken = localStorage.getItem("interviewerAuthToken");

  if (adminAuthToken) {
    req.headers.Authorization = `Bearer ${adminAuthToken}`;
  } else if (studentAuthToken) {
    req.headers.Authorization = `Bearer ${studentAuthToken}`;
  } else if (interviewerAuthToken) {
    req.headers.Authorization = `Bearer ${interviewerAuthToken}`;
  }

  return req;
});

export const studentLogin = async (formData) =>
  await API.post("students/login", formData);

export const studentSignUp = async (formData) =>
  await API.post("students/signup", formData);

export const adminLogin = async (formData) =>
  await API.post("admin/login", formData);

export const adminSignUp = async (formData) =>
  await API.post("admin/signup", formData);

export const interviewerLogin = async (formData) =>
  await API.post("interviewer/login", formData);

export const interviewerSignUp = async (formData) =>
  await API.post("interviewer/signup", formData);
