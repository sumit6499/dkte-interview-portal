import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submissions
app.post('/signup', (req, res) => {
  // Handle form submission data
  const formData = req.body;
  console.log('Received form data:', formData); // Log form data for testing

  // Check if the formData is defined and has the expected structure
  if (formData && formData.selectedDays && formData.selectedTimes) {
    // Iterate over selectedDays and selectedTimes
    formData.selectedDays.forEach((day) => {
      const times = formData.selectedTimes[day];
      if (times) {
        times.forEach((time) => {
          // Log each time for the current day
          console.log(`Day: ${day}, Start Time: ${time.start}, End Time: ${time.end}`);
        });
      }
    });
  } else {
    console.error('Form data is missing or has unexpected structure');
  }

  // Here you can perform validation, database operations, etc.

  // Send response indicating successful signup
  res.status(200).json({ message: 'Signup successful' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
