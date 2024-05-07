import express from 'express';
import multer from 'multer';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __dirname = fileURLToPath(import.meta.url);
const app = express();
const port = 5000;

// Middleware for CORS
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/iampm/Desktop/All notes'); // Change the destination path
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST endpoint for form submission
app.post('/submit-form', upload.single('idcard'), (req, res) => {
  const formData = req.body;
  const idCardPath = req.file.path; // Path to the uploaded ID card file

  // Here you can process the form data and handle the file as needed
  // For simplicity, let's just log the form data and file path
  console.log('Received form data:', formData);
  console.log('Uploaded ID card path:', idCardPath);

  // Sending response back to the client
  res.status(200).json({ message: 'Form submitted successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
