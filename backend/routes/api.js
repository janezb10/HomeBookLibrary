const express = require("express");
const router = express.Router();

// Forward in /vi/books
router.use("/v1", require("./v1/books"));

module.exports = router;
