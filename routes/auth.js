const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersDB = path.join(__dirname, "../db/users.json");

// Registro
router.post("/register", async (req, res) => {
    const { username, password, genres } = req.body;

    if (!username || !password || !genres) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    try {
        const users = JSON.parse(fs.readFileSync(usersDB, "utf8") || "[]");

        if (users.find((user) => user.username === username)) {
            return res.status(409).json({ error: "Usuario ya registrado" });
        }

        users.push({ username, password, genres });
        fs.writeFileSync(usersDB, JSON.stringify(users, null, 2));

        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
});

// Login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    try {
        const users = JSON.parse(fs.readFileSync(usersDB, "utf8") || "[]");
        const user = users.find((u) => u.username === username);

        if (!user) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        res.json({ message: "Login exitoso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
});

module.exports = router;
