const express = require("express");
const router = express.Router();
const handleLogin = require("../middleware/login");

// Endpoint to login
router.post("/login", handleLogin);

module.exports = router;
