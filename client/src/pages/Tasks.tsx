import React, { useState, useEffect } from "react";
import "../Tasks.css";

const Tasks = () => {
    interface Task {
        id: number;
        title: string;
        description: string;
    }
    const username = localStorage.getItem("username");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState("");
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Not Authorized. Please log in.");
                return;
            }

            const res = await fetch("http://localhost:5000/tasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });

            const data = await res.json();

            if (res.ok) {
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    setError("Invalid response format from server.");
                }
            } else {
                setError(data.error || "Failed to load tasks.");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setError("Something went wrong. Please try again later.");
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Not Authorized");
                return;
            }

            const res = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(newTask),
            });

            const data = await res.json();

            if (res.ok) {
                setNewTask({ title: "", description: "" });
                fetchTasks();
            } else {
                setError(data.error || "Failed to create task.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            setError("Something went wrong. Please try again later.");
        }
    };

    const handleUpdateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTask) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Not Authorized");
                return;
            }

            const res = await fetch(`http://localhost:5000/tasks/${editingTask.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    title: editingTask.title,
                    description: editingTask.description,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setEditingTask(null);
                fetchTasks();
            } else {
                setError(data.error || "Failed to update task.");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            setError("Something went wrong. Please try again later.");
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Not Authorized");
                return;
            }

            const res = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            });

            if (res.ok) {
                fetchTasks();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to delete task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            setError("Something went wrong. Please try again later.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login";
    };

    return (
        <div>
            <h2 style={{ textAlign: "center", backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "8px" }}>
                Hello, {username || "User"}!
            </h2>
            <h2>Task Management Dashboard </h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Task Creation Form */}
            <form onSubmit={handleCreateTask}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    required
                />
                <button type="submit">Create New Task</button>
            </form>

            <br />

            {editingTask && (
                <div>
                    <h3>Update Task</h3>
                    <form onSubmit={handleUpdateTask}>
                        <input
                            type="text"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            required
                        />
                        <button type="submit">Save Changes</button>
                        <button onClick={() => setEditingTask(null)}>Cancel</button>
                    </form>
                </div>
            )}

            {tasks.length > 0 ? (
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                    <button onClick={() => setEditingTask(task)}>Update</button>
                                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !error && <p>No tasks found.</p>
            )}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Tasks;
