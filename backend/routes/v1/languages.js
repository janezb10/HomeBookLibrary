const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");

router.get("/:keyword?", async (req, res, next) => {
  try {
    const sql = `
        SELECT *
        FROM languages
        WHERE language
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
        INSERT INTO languages (language)
        VALUES (?)`;
    const [result] = await db.execute(sql, [req.body.language]);

    const sqlNewLanguage = `
    SELECT *
    FROM languages
    WHERE id_language = ?`;
    const [newLanguage] = await db.execute(sqlNewLanguage, [result.insertId]);

    res.json(newLanguage);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
