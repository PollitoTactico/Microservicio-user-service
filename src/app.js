const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("../routes/auth");
require('dotenv').config(); // Asegúrate de la ruta correcta

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", authRoutes);  // Prefijo de la ruta

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`User service running on http://localhost:${PORT}`));
