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
app.post("/signup", (req, res) => {
  // Handle form submission data
  const formData = req.body;
  console.log("Received form data:");
  console.log("Form data received:", formData);

  // Check if formData is defined
  if (formData) {
    // Iterate over formData keys and log each field with its data
    console.log(...formData);
    console.log("below is data")
    // console.log(Object.fromEntries(formData));
    Object.keys(formData).forEach((field) => {
      console.log("hi i m in ")
      console.log(`${field}: ${formData[field]}`);
    });
    console.log("Above is data")
  } else {
    console.error("Form data is missing");
  }



  res.status(200).json({ message: "Signup successful" });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
