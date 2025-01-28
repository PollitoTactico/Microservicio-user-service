const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("../routes/auth");
require('dotenv').config();

const corsOptions = {
    origin: "https://front-movies-production.up.railway.app", // Cambia a la URL de tu frontend
    methods: ["GET", "POST"],
  };
app.use(cors(corsOptions));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", authRoutes);  // Prefijo de la ruta

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`User service running on http://localhost:${PORT}`));
