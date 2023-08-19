const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");
router.get("/:keyword?", async (req, res, next) => {
  try {
    const sql = `
        SELECT *
        FROM avtor
        WHERE avtor
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
        INSERT INTO avtor (avtor)
        VALUES (?)`;
    const [result] = await db.execute(sql, [req.body.author]);
    const newAuthor = {
      id: result.insertId,
      author: req.body.author,
    };
    res.json(newAuthor);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
