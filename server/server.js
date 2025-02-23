const express = require('express');
const app = express();
const { pool } = require('./dbConfig.js');
const bcrypt = require('bcrypt');
const authorization = require("./middleware/authorization.js");

const PORT = 5000;
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/auth', require('./routes/jwtAuth.js'))

app.use("/tasks", require('./routes/tasks.js'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});