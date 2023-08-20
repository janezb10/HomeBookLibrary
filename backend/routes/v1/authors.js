const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");
router.get("/:keyword?", async (req, res, next) => {
  try {
    const sql = `
        SELECT *
        FROM authors
        WHERE author
        LIKE ?`;
    const arr = req.params.keyword ? [`%${req.params.keyword}%`] : ["%%"];
    const [rows] = await db.execute(sql, arr);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const sql = `
        INSERT INTO authors (author)
        VALUES (?)`;
    const [result] = await db.execute(sql, [req.body.author]);

    const sqlNewAuthor = `
        SELECT *
        FROM authors
        WHERE id_author
        LIKE ?`;
    const [newAuthor] = await db.execute(sqlNewAuthor, [result.insertId]);

    res.json(newAuthor);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
