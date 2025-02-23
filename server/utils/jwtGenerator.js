const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (id, email) => {
    const payload = { user: { id, email } };
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
};

module.exports = jwtGenerator;