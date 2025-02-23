
const router = require('express').Router();

const { pool } = require("../dbConfig.js");
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator.js');

router.post('/signup', async (req, res) => {
    try {
        let { name, email, password, confirmPassword } = req.body;

        console.log({ name, email, password, confirmPassword });

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (result.rows.length > 0) {
            return res.status(400).json({ error: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        if (!newUser.rows.length) {
            return res.status(500).json({ error: "User creation failed." });
        }

        const token = jwtGenerator(newUser.rows[0].id, newUser.rows[0].email);

        return res.status(201).json({
            message: "User created successfully!",
            token
        });

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        console.log({ email, password });

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Fetch user from database
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        // Check if user exists
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Email or Password is wrong!" });
        }

        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, result.rows[0].password);

        if (!isMatch) {
            return res.status(400).json({ error: "Email or Password is wrong!" });
        }

        // Send success response
        const token = jwtGenerator(result.rows[0].id, result.rows[0].email);

        return res.status(200).json({
            message: "Login Successful!",
            name: result.rows[0].name,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;