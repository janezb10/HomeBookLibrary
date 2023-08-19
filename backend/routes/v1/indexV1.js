const express = require("express");
const router = express.Router();

// Forward in /vi/books
router.use("/books", require("./books"));
router.use("/search", require("./search"));
router.use("/authors", require("./authors"));
router.use("/positions", require("./positions"));
router.use("/languages", require("./languages"));
router.use("/collections", require("./collections"));
router.use("/fields", require("./fields"));

module.exports = router;
