export const departmentOptions = [
    "CSE",
    "AI",
    "AIDS",
    "ENTC",
    "MECH",
    "ELECTRIC",
    "CIVIL",
];

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
    { name: "class", label: "Class", type: "text" },
    { name: "PRN", label: "PRN", type: "text" },
    { name: "password", label: "Password", type: "text" },
    { name: "idcard", label: "ID Card", type: "file" },
    { name: "resume", label: "Resume", type: "file" },
];

export const stdFieldsStage2 = [];

export  const Adminfields = [
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "password", label: "Password", type: "text" },
        { name: "idcard", label: "ID Card", type: "file" }
    ];
export const Navlink = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
export const AdminNavLinks = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
export  const AdminLoginfields = [
        { name: "name", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" }
    ];
export  const StudentNavlinks = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
export const StduentLoginfields = [
        { name: "username", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" }
    ];
export const InterviewerNavLinks = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
export const InterviewerLoginfields = [
        { name: "username", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" }
    ];
export const   AdminSchedulesNavlinks = [
        { label: 'Home', url: '/' },
        { label: 'Students', url: '/login/admin/students' },
        { label: 'Schedules', url: '/login/admin/adminschedules' },
        { label: 'Contact', url: '/' }
    ];
export const AdminStudentsNavlinks = [
        { label: 'Home', url: '/' },
        { label: 'Students', url: '/login/admin/students' },
        { label: 'Schedules', url: '/login/admin/interviewschedules' },
        { label: 'Contact', url: '/' },
    ];


export const InterviewerProfileNavLinks = [
        { label: 'Home', url: '/' },
        { label: 'Schedules', url: '/' },
        { label: 'DashBoard', url: '/' },
        { label: 'Contact', url: '/' }
    ];

export  const StudentDashboardNavlinks = [
        { label: 'Home', url: '/' },
        { label: 'Schedules', url: '/StudentHome' },
        { label: 'Dashboard', url: '/StudentDashboard' },
        { label: 'Contact', url: '/' },
    ];

export const StudentHomeNavlinks  = [
        { label: 'Home', url: '/' },
        { label: 'Schedules', url: '/login/student/studenthome' },
        { label: 'DashBoard', url: '/login/student/dashboard' },
        { label: 'Contact', url: '/' }
    ];

export const StudentProfileNavlinks = [
        { label: 'Home', url: '/' },
        { label: 'Schedules', url: '/' },
        { label: 'DashBoard', url: '/' },
        { label: 'Contact', url: '/' }
    ];

//fotter
import { Instagram, Twitter, Facebook } from '@/assets/index.js';
export const socialMediaLinks = [
    { name: 'Twitter', url: 'https://Twitter.com', icon: Twitter },
    { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
    { name: 'Facebook', url: 'https://Facebook.com', icon: Facebook }
];


