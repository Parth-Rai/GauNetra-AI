const express = require("express");
const router = express.Router();
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const db = require('../db'); 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }

  const imagePath = req.file.path;
  const scriptPath = path.resolve(__dirname, '../ml_runner/predict.py');
  
  const pythonProcess = spawn("/usr/bin/python3", [scriptPath, imagePath]);

  let resultData = "";
  pythonProcess.stdout.on("data", (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Script Error: ${data}`);
  });

  pythonProcess.on("close", async (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Failed to run prediction model." });
    }
    
    try {
      
      const result = JSON.parse(resultData);
      const { breed, confidence } = result;
      
      const latitude = 28.6139;  
      const longitude = 77.2090; 

      const dbQuery = `
        INSERT INTO predictions (image_path, breed, confidence, latitude, longitude, created_at) 
        VALUES ($1, $2, $3, $4, $5, NOW())
      `;
      
      await db.query(dbQuery, [imagePath, breed, confidence, latitude, longitude]);
      console.log('Prediction saved successfully to the database.');
      
      res.json(result);

    } catch (e) {
      console.error("Error processing prediction or saving to DB:", e);
      res.status(500).json({ error: "Failed to parse prediction or save result." });
    }
  });
});

module.exports = router;