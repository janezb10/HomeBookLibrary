const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");

router.get("/:keyword?", async (req, res, next) => {
  try {
    const sql = `
        SELECT *
        FROM jezik
        WHERE jezik
        LIKE ?`;
    const arr = req.params.keyword ? [`%${req.params.keyword}%`] : ["%%"];
    const [rows] = await db.execute(sql, arr);
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const sql = `
        INSERT INTO jezik (jezik)
        VALUES (?)`;
    const [rows] = await db.execute(sql, [req.body.jezik]);
    if (rows.affectedRows === 0) throw new Error("Something went wrong");
    res.send("new language added");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
