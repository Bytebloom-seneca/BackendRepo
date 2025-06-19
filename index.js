require("dotenv").config();
const express = require("express");
const cors = require("cors");

const rideRoutes = require("./routes/rides");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("SenecaRide Backend is live"));
app.use("/api/rides", rideRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
