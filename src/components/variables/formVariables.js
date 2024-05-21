export const departmentOptions = [
  "CSE",
  "AI",
  "AIDS",
  "ENTC",
  "MECH",
  "ELECTRIC",
  "CIVIL",
];
export const stdAllFields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  {
    name: "dept",
    label: "Department",
    type: "select",
    options: departmentOptions,
  },
  {
    name: "class",
    label: "Class",
    type: "select",
    options: ["FY", "SY", "TY", "Final Year"],
  },
  { name: "PRN", label: "PRN", type: "text" },
  { name: "password", label: "Password", type: "text" },
  { name: "idCard", label: "ID Card", type: "file" },
  { name: "resume", label: "Resume", type: "file" },
  { name: "UPI", label: "UPI Transaction ID", type: "text" },
  { name: "paymentImage", label: "Upload Payment Proof", type: "file" },
];``
export const stdFieldsStage1 = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  {
    name: "dept",
    label: "Department",
    type: "select",
    options: departmentOptions,
  },
  {
    name: "class",
    label: "Class",
    type: "select",
    options: ["FY", "SY", "TY", "Final Year"],
  },
  { name: "PRN", label: "PRN", type: "text" },
  { name: "password", label: "Password", type: "text" },
  { name: "idCard", label: "ID Card", type: "file" },
  { name: "resume", label: "Resume", type: "file" },
];

export const stdFieldsStage2 = [
  { name: "UPI", label: "UPI Transaction ID", type: "text" },
  { name: "paymentImage", label: "Upload Payment Proof", type: "file" },
];

export const Adminfields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "password", label: "Password", type: "text" },
  { name: "idCard", label: "ID Card", type: "file" },
  {
    name: "dept",
    label: "Department",
    type: "select",
    options: departmentOptions,
  },
];
export const AdminfieldsToServer = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "password", label: "Password", type: "text" },
 
];
export const Navlink = [
  { label: "Home", url: "/" },
  { label: "Login", url: "/login" },
  { label: "Register", url: "/signup" },
  { label: "Contact", url: "/" },
];
export const AdminNavLinks = [
  { label: "Home", url: "/" },
  { label: "Login", url: "/login" },
  { label: "Register", url: "/signup" },
  { label: "Contact", url: "/" },
];
export const AdminLoginfields = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];
export const StudentNavlinks = [
  { label: "Home", url: "/" },
  { label: "Login", url: "/login" },
  { label: "Register", url: "/signup" },
  { label: "Contact", url: "/" },
];
export const StduentLoginfields = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];
export const InterviewerNavLinks = [
  { label: "Home", url: "/" },
  { label: "Login", url: "/login" },
  { label: "Register", url: "/signup" },
  { label: "Contact", url: "/" },
];
export const InterviewerLoginfields = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];
export const AdminSchedulesNavlinks = [
  { label: "Home", url: "/" },
  { label: "Students", url: "/login/admin/students" },
  { label: "Schedules", url: "/login/admin/adminschedules" },
  { label: "Contact", url: "/" },
];
export const AdminStudentsNavlinks = [
  { label: "Home", url: "/" },
  { label: "Students", url: "/login/admin/students" },
  { label: "Schedules", url: "/login/admin/adminschedules" },
  { label: "Contact", url: "/" },
];

export const InterviewerProfileNavLinks = [
  { label: "Home", url: "/" },
  // { label: "DashBoard", url: "/" },
  { label: "Schedules", url: "/login/interviewer/schedules" },
  { label: "Contact", url: "/" },
];

export const StudentDashboardNavlinks = [
  { label: "Home", url: "/" },
  { label: "Schedules", url: "/login/student/studenthome" },
  { label: "Dashboard", url: "/login/student/dashboard" },
  { label: "Contact", url: "/" },
];

export const StudentHomeNavlinks = [
  { label: "Home", url: "/" },
  { label: "Schedules", url: "/login/student/studenthome" },
  { label: "DashBoard", url: "/login/student/dashboard" },
  { label: "Contact", url: "/" },
];

export const StudentProfileNavlinks = [
  { label: "Home", url: "/" },
  { label: "Schedules", url: "/login/student/studenthome" },
  { label: "DashBoard", url: "/login/student/dashboard" },
  { label: "Contact", url: "/" },
 
];

//fotter
import { Instagram, Twitter, Facebook } from "@/assets/index.js";
export const socialMediaLinks = [
  { name: "Twitter", url: "https://Twitter.com", icon: Twitter },
  { name: "Instagram", url: "https://instagram.com", icon: Instagram },
  { name: "Facebook", url: "https://Facebook.com", icon: Facebook },
];

export const criteria = [
  {
    label: "technical",
    options: [
      { text: "Poor", value: 2 },
      { text: "Mediocre", value: 4 },
      { text: "Satisfactory", value: 6 },
      { text: "Good", value: 8 },
      { text: "Excellent", value: 10 },
    ],
  },
  {
    label: "communication",
    options: [
      { text: "Poor", value: 2 },
      { text: "Mediocre", value: 4 },
      { text: "Satisfactory", value: 6 },
      { text: "Good", value: 8 },
      { text: "Excellent", value: 10 },
    ],
  },
  {
    label: "behaviour",
    options: [
      { text: "Poor", value: 2 },
      { text: "Mediocre", value: 4 },
      { text: "Satisfactory", value: 6 },
      { text: "Good", value: 8 },
      { text: "Excellent", value: 10 },
    ],
  },
  {
    label: "apperance",
    options: [
      { text: "Poor", value: 2 },
      { text: "Mediocre", value: 4 },
      { text: "Satisfactory", value: 6 },
      { text: "Good", value: 8 },
      { text: "Excellent", value: 10 },
    ],
  },
];

  // {
  //   label: "Listening skills",
  //   options: ["Poor", "Mediocre", "Satisfactory", "Good", "Excellent"],
  // },
  // {
  //   label: "Attitude",
  //   options: ["Poor", "Mediocre", "Satisfactory", "Good", "Excellent"],
  // },
  // {
  //   label: "Confidence Level",
  //   options: ["Poor", "Mediocre", "Satisfactory", "Good", "Excellent"],
  // },
  // {
  //   label: "Presentation skills",
  //   options: ["Poor", "Mediocre", "Satisfactory", "Good", "Excellent"],
  // },
  // {
  //   label: "Appearance",
  //   options: ["Poor", "Mediocre", "Satisfactory", "Good", "Excellent"],
  // },
  // {
  //   label: "Problem Solving Skills",
  //   options: ["Poor", "Mediocre", "Satisfactory", "Good", "Excellent"],
  // },
  // {
  //   label: "Overall Technical Skills Ratings",
  //   options: ["Poor", "Mediocre", "Satisfactory", "Good", "Excellent"],
  // },
// ];

//interview Schedule
export  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];