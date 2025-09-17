require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const predictRoutes = require("./routes/predict");
const dashboardRoutes = require("./routes/dashboard");

const app = express();


const corsOptions = {
  origin: 'https://gaunetra-ai.onrender.com' 
};
app.use(cors(corsOptions));


app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/predict", predictRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));