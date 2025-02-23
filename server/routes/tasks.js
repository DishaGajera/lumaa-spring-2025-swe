const express = require('express');
const router = express.Router();
const { pool } = require('../dbConfig');
const authorization = require('../middleware/authorization');

// POST /tasks route - Only authenticated users can create tasks
router.post("/", authorization, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        console.log("User ID:", userId);

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const newTask = await pool.query(
            "INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
            [userId, title, description]
        );
        res.status(201).json(newTask.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/", authorization, async (req, res) => {
    try {
        const user_id = req.user.id;
        const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [user_id]);
        res.json(tasks.rows);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Update a task
router.put("/:id", authorization, async (req, res) => {
    try {
        const { title, description } = req.body;
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
            [title, description, req.params.id, req.user.id]
        );
        if (result.rowCount === 0) return res.status(404).json({ error: "Task not found" });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Task update failed" });
    }
});

// Delete a task
router.delete("/:id", authorization, async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
        if (result.rowCount === 0) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: "Task deletion failed" });
    }
});

module.exports = router;
