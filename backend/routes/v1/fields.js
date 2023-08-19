const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");

router.get("/podrocja/:keyword?", async (req, res, next) => {
  try {
    const sql = `
        SELECT *
        FROM podrocje
        WHERE podrocje
        LIKE ?`;
    const arr = req.params.keyword ? [`%${req.params.keyword}%`] : ["%%"];
    const [rows] = await db.execute(sql, arr);
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

router.post("/podrocja", async (req, res, next) => {
  try {
    const sql = `
        INSERT INTO podrocje (podrocje)
        VALUES (?)`;
    const [rows] = await db.execute(sql, [req.body.podrocje]);
    if (rows.affectedRows === 0) throw new Error("Something went wrong");
    res.send("novo podrocje dodano");
  } catch (err) {
    next(err);
  }
});

router.get("/podpodrocja", async (req, res, next) => {
  try {
    const sql = `
        SELECT *
        FROM podpodrocje`;
    const [rows] = await db.execute(sql);
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

router.post("/poodpodrocje", async (req, res, next) => {
  try {
    const sql = `
        INSERT INTO podpodrocje (id_podrocje, podpodrocje)
        VALUES(?, ?)`;
    const arr = [req.body.id_podrocje, req.body.podpodrocje];
    console.log(arr);
    const [rows] = await db.execute(sql, [
      req.body.id_podrocje,
      req.body.podpodrocje,
    ]);
    if (rows.affectedRows === 0) throw new Error("Something went wrong");
    res.send("novo podpodrocje dodano");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
