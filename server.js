import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Specify the expected file fields
const uploadFields = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "idCard", maxCount: 1 },
  { name: "paymentImage", maxCount: 1 },
]);

// Endpoint to handle form submissions
app.post("/signup", uploadFields, (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  // Check if formData is defined
  if (formData) {
    Object.keys(formData).forEach((field) => {
      console.log(`${field}: ${formData[field]}`);
    });

    // Check for uploaded files
    if (req.files) {
      if (req.files["resume"]) {
        console.log(
          "Resume file received:",
          req.files["resume"][0].originalname
        );
      }
      if (req.files["idCard"]) {
        console.log(
          "ID Card file received:",
          req.files["idCard"][0].originalname
        );
      }
      if (req.files["paymentImage"]) {
        console.log(
          "paymentPdf file received:",
          req.files["paymentImage"][0].originalname
        );
      }
    } else {
      console.error("Files are missing");
    }
  } else {
    console.error("Form data is missing");
  }

  res.status(200).json({ message: "Signup successful" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
