const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");

/* get book with id */
router.get("/:id", async (req, res, next) => {
  try {
    const sql = `
            SELECT id, naslov, avtor, podrocje, podpodrocje, pozicija, jezik, zbirka, drzava, leto, opombe
            FROM knjige
            LEFT JOIN avtor ON knjige.id_avtor = avtor.id_avtor
            LEFT JOIN podrocje ON knjige.id_podrocje = podrocje.id_podrocje
            LEFT JOIN podpodrocje ON knjige.id_podpodrocje = podpodrocje.id_podpodrocje AND knjige.id_podrocje = podpodrocje.id_podrocje
            LEFT JOIN pozicija ON knjige.id_pozicija = pozicija.id_pozicija
            LEFT JOIN jezik ON knjige.id_jezik = jezik.id_jezik
            LEFT JOIN zbirka ON knjige.id_zbirka = zbirka.id_zbirka
            WHERE id = ?;`;
    const [result] = await db.execute(sql, [req.params.id]);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

/* New book */
router.post("/", async (req, res, next) => {
  try {
    const sql = `
            INSERT INTO knjige 
            (naslov
                ${req.body.id_author ? ", id_avtor" : ""}
                ${req.body.id_field ? ", id_podrocje" : ""}
                ${req.body.id_subfield ? ", id_podpodrocje" : ""}
                ${req.body.id_position ? ", id_pozicija" : ""}
                ${req.body.id_language ? ", id_jezik" : ""}
                ${req.body.id_collection ? ", id_zbirka" : ""}
                ${req.body.country ? ", drzava" : ""}
                ${req.body.year ? ", leto" : ""}
                ${req.body.notes ? ", opombe" : ""}
            )
            VALUES (?
                ${req.body.id_author ? ", ?" : ""}
                ${req.body.id_field ? ", ?" : ""}
                ${req.body.id_subfield ? ", ?" : ""}
                ${req.body.id_position ? ", ?" : ""}
                ${req.body.id_language ? ", ?" : ""}
                ${req.body.id_collection ? ", ?" : ""}
                ${req.body.country ? ", ?" : ""}
                ${req.body.year ? ", ?" : ""}
                ${req.body.notes ? ", ?" : ""}
            );`;

    let ar = [];
    if (req.body.title) ar.push(req.body.title);
    if (req.body.id_author) ar.push(req.body.id_author);
    if (req.body.id_field) ar.push(req.body.id_field);
    if (req.body.id_subfield) ar.push(req.body.id_subfield);
    if (req.body.id_position) ar.push(req.body.id_position);
    if (req.body.id_language) ar.push(req.body.id_language);
    if (req.body.id_collection) ar.push(req.body.id_collection);
    if (req.body.country) ar.push(req.body.country);
    if (req.body.year) ar.push(req.body.year);
    if (req.body.notes) ar.push(req.body.notes);

    const [result] = await db.execute(sql, ar);

    const sqlNewBook = `
            SELECT id, naslov, avtor, podrocje, podpodrocje, pozicija, jezik, zbirka, drzava, leto, opombe
            FROM knjige
            LEFT JOIN avtor ON knjige.id_avtor = avtor.id_avtor
            LEFT JOIN podrocje ON knjige.id_podrocje = podrocje.id_podrocje
            LEFT JOIN podpodrocje ON knjige.id_podpodrocje = podpodrocje.id_podpodrocje AND knjige.id_podrocje = podpodrocje.id_podrocje
            LEFT JOIN pozicija ON knjige.id_pozicija = pozicija.id_pozicija
            LEFT JOIN jezik ON knjige.id_jezik = jezik.id_jezik
            LEFT JOIN zbirka ON knjige.id_zbirka = zbirka.id_zbirka
            WHERE id = ?;`;
    const [newBook] = await db.execute(sqlNewBook, [result.insertId]);

    res.json(newBook);
  } catch (err) {
    next(err);
  }
});

/* update book*/
router.put("/:id", async (req, res, next) => {
  try {
    const sqlp = `
            SELECT id 
            FROM knjige 
            WHERE id = ?;`;
    const [rowsp] = await db.execute(sqlp, [req.params.id]);
    if (rowsp.length === 0) {
      res.status(404).send();
      return;
    }

    const sql = `
            UPDATE knjige
            SET 
            id = ?
            ${req.body.title ? ", naslov = ?" : ""}
            ${req.body.id_author ? ", id_avtor = ?" : ""}
            ${req.body.id_field ? ", id_podrocje = ?" : ""}
            ${req.body.id_subfield ? ", id_podpodrocje = ?" : ""}
            ${req.body.id_position ? ", id_pozicija = ?" : ""}
            ${req.body.id_language ? ", id_jezik = ?" : ""}
            ${req.body.id_collection ? ", id_zbirka = ?" : ""}
            ${req.body.country ? ", drzava = ?" : ""}
            ${req.body.year ? ", leto = ?" : ""}
            ${req.body.notes ? ", opombe = ?" : ""}
            WHERE id = ?
        `;
    let ar = [];
    if (req.params.id) ar.push(req.params.id);
    if (req.body.title) ar.push(req.body.title);
    if (req.body.id_author) ar.push(req.body.id_author);
    if (req.body.id_field) ar.push(req.body.id_field);
    if (req.body.id_subfield) ar.push(req.body.id_subfield);
    if (req.body.id_position) ar.push(req.body.id_position);
    if (req.body.id_language) ar.push(req.body.id_language);
    if (req.body.id_collection) ar.push(req.body.id_collection);
    if (req.body.country) ar.push(req.body.country);
    if (req.body.year) ar.push(req.body.year);
    if (req.body.notes) ar.push(req.body.notes);
    if (req.params.id) ar.push(req.params.id);

    await db.execute(sql, ar);

    const sqlUpdatedBook = `
            SELECT id, naslov, avtor, podrocje, podpodrocje, pozicija, jezik, zbirka, drzava, leto, opombe
            FROM knjige
            LEFT JOIN avtor ON knjige.id_avtor = avtor.id_avtor
            LEFT JOIN podrocje ON knjige.id_podrocje = podrocje.id_podrocje
            LEFT JOIN podpodrocje ON knjige.id_podpodrocje = podpodrocje.id_podpodrocje AND knjige.id_podrocje = podpodrocje.id_podrocje
            LEFT JOIN pozicija ON knjige.id_pozicija = pozicija.id_pozicija
            LEFT JOIN jezik ON knjige.id_jezik = jezik.id_jezik
            LEFT JOIN zbirka ON knjige.id_zbirka = zbirka.id_zbirka
            WHERE id = ?;`;
    const [updatedBook] = await db.execute(sqlUpdatedBook, [req.params.id]);

    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
});

/* DELETE BOOK IF DOG EATS IT */
router.delete("/books/:id", async (req, res, next) => {
  try {
    const sql = `
        DELETE FROM knjige WHERE id = ?;`;
    const [rows] = await db.execute(sql, [req.params.id]);
    if (rows.affectedRows === 0) {
      res.status(404).send();
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
