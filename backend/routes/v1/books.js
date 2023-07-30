const express = require("express");
const router = express.Router();

router.get("/a", (req, res, next) => {
  res.send("jaman dela neki tuki");
});

module.exports = router;
