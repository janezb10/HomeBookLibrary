const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");

router.get("/:keyword?", async (req, res, next) => {
  try {
    const sql = `
        SELECT *
        FROM collections
        WHERE collection
        LIKE ?`;
    const arr = req.params.keyword ? [`%${req.params.keyword}%`] : ["%%"];
    const [result] = await db.execute(sql, arr);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const sql = `
        INSERT INTO collections (collection)
        VALUES (?)`;
    const [result] = await db.execute(sql, [req.body.collection]);

    const sqlNewCollection = `
        SELECT *
        FROM collections
        WHERE id_collection
        LIKE ?`;
    const [newCollection] = await db.execute(sqlNewCollection, [
      result.insertId,
    ]);

    res.json(newCollection);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
