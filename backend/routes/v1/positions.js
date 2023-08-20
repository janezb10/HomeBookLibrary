const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");

router.get("/:keyword?", async (req, res, next) => {
  try {
    const sql = `
        SELECT * 
        FROM positions
        WHERE position
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
        INSERT INTO positions (position)
        VALUES (?)`;
    const [result] = await db.execute(sql, [req.body.pozicija]);

    const sqlNewPosition = `
    SELECT *
    FROM positions
    WHERE id_position = ?`;
    const [newPosition] = await db.execute(sqlNewPosition, [result.insertId]);

    res.json(newPosition);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
