import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample user data (replace with your database)
const users = [
    { id: 1, username: 'admin', password: 'admin123' },
    { id: 2, username: 'user', password: 'user123' }
];
let users1 = [
    { id: 1, username: 'admin', email: 'admin@example.com', password: 'admin123' },
    { id: 2, username: 'user', email: 'user@example.com', password: 'user123' }
];

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Find user by username
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    if (user.password !== password) {
        console.log('Password: ' + user.password);
        console.log('username: ' + user.username);
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', userExists: true, user });
});

// Signup route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    // Check if the username or email already exists
    const existingUser = users.find(user1 => user1.username === username || user1.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }
    // Add the new user to the users array
    const newUser = { id: users1.length + 1, username, email, password };
    users1.push(newUser);
    res.status(201).json({ message: 'Signup successful', user: newUser });
});

const scheduledInterviews = [];

// Sample student data
const students = [
    {
        id: 1,
        name: 'John Doe',
        prn: 'PRN001',
        branch: 'CSE - AI',
        class: 'TY'
    },
    {
        id: 2,
        name: 'Jane Smith',
        prn: 'PRN002',
        branch: 'ECE',
        class: 'SY'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        prn: 'PRN003',
        branch: 'CSE - AI',
        class: 'TY'
    },
    {
        id: 4,
        name: 'Bob Brown',
        prn: 'PRN004',
        branch: 'ECE',
        class: 'FY'
    },
    {
        id: 5,
        name: 'Emily Davis',
        prn: 'PRN005',
        branch: 'CSE - AI',
        class: 'SY'
    },
    {
        id: 6,
        name: 'Michael Wilson',
        prn: 'PRN006',
        branch: 'ECE',
        class: 'TY'
    },
    {
        id: 7,
        name: 'Sophia Martinez',
        prn: 'PRN007',
        branch: 'CSE - AI',
        class: 'FY'
    },
    {
        id: 8,
        name: 'William Anderson',
        prn: 'PRN008',
        branch: 'ECE',
        class: 'SY'
    },
    {
        id: 9,
        name: 'Olivia Taylor',
        prn: 'PRN009',
        branch: 'CSE - AI',
        class: 'FY'
    },
    {
        id: 10,
        name: 'James Thomas',
        prn: 'PRN010',
        branch: 'ECE',
        class: 'TY'
    },
    {
        id: 11,
        name: 'Ava White',
        prn: 'PRN011',
        branch: 'CSE - AI',
        class: 'SY'
    },
    {
        id: 12,
        name: 'Ethan Harris',
        prn: 'PRN012',
        branch: 'ECE',
        class: 'FY'
    },
    {
        id: 13,
        name: 'Isabella Garcia',
        prn: 'PRN013',
        branch: 'CSE - AI',
        class: 'TY'
    },
    {
        id: 14,
        name: 'Mason Lee',
        prn: 'PRN014',
        branch: 'ECE',
        class: 'SY'
    },
    {
        id: 15,
        name: 'Charlotte Scott',
        prn: 'PRN015',
        branch: 'CSE - AI',
        class: 'FY'
    }
];


// Route to get students data
app.get('/api/students', (req, res) => {
    res.json(students);
});

app.post('/api/schedule', (req, res) => {
    const { name, prn, branch, Year, dateTime } = req.body;
    // Store scheduled interview in the array
    scheduledInterviews.push({ name, prn, branch, Year, dateTime });
    console.log(`Scheduled interview for ${name} (PRN: ${prn}) from ${branch} - ${Year} at ${dateTime}`);
    // Send success response
    res.status(200).json({ message: 'Interview scheduled successfully' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
