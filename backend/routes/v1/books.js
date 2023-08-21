const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");

/* get book with id */
router.get("/:id", async (req, res, next) => {
  try {
    const sql = `
            SELECT id, title, author, books.id_author, field, books.id_field, subfield, books.id_subfield, position, books.id_position, language, books.id_language, collection, books.id_collection, country, year, notes
            FROM books
            LEFT JOIN authors ON books.id_author = authors.id_author
            LEFT JOIN fields ON books.id_field = fields.id_field
            LEFT JOIN subfields ON books.id_subfield = subfields.id_subfield AND books.id_field = subfields.id_field
            LEFT JOIN positions ON books.id_position = positions.id_position
            LEFT JOIN languages ON books.id_language = languages.id_language
            LEFT JOIN collections ON books.id_collection = collections.id_collection
            WHERE id = ?;`;
    const [result] = await db.execute(sql, [req.params.id]);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/* New book */
router.post("/", async (req, res, next) => {
  try {
    const sql = `
            INSERT INTO books 
            (title
                ${req.body.id_author ? ", id_author" : ""}
                ${req.body.id_field ? ", id_field" : ""}
                ${req.body.id_subfield ? ", id_subfield" : ""}
                ${req.body.id_position ? ", id_position" : ""}
                ${req.body.id_language ? ", id_language" : ""}
                ${req.body.id_collection ? ", id_collection" : ""}
                ${req.body.country ? ", country" : ""}
                ${req.body.year ? ", year" : ""}
                ${req.body.notes ? ", notes" : ""}
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
                SELECT id, title, author, books.id_author, field, books.id_field, subfield, books.id_subfield, position, books.id_position, language, books.id_language, collection, books.id_collection, country, year, notes
                FROM books
                 LEFT JOIN authors ON books.id_author = authors.id_author
                 LEFT JOIN fields ON books.id_field = fields.id_field
                 LEFT JOIN subfields ON books.id_subfield = subfields.id_subfield AND books.id_field = subfields.id_field
                 LEFT JOIN positions ON books.id_position = positions.id_position
                 LEFT JOIN languages ON books.id_language = languages.id_language
                 LEFT JOIN collections ON books.id_collection = collections.id_collection
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
            FROM books 
            WHERE id = ?;`;
    const [rowsp] = await db.execute(sqlp, [req.params.id]);
    if (rowsp.length === 0) {
      res.status(404).send();
      return;
    }

    const sql = `
            UPDATE books
            SET 
            id = ?
            ${req.body.title ? ", title = ?" : ""}
            ${req.body.id_author ? ", id_author = ?" : ""}
            ${req.body.id_field ? ", id_field = ?" : ""}
            ${req.body.id_subfield ? ", id_subfield = ?" : ""}
            ${req.body.id_position ? ", id_position = ?" : ""}
            ${req.body.id_language ? ", id_language = ?" : ""}
            ${req.body.id_collection ? ", id_collection = ?" : ""}
            ${req.body.country ? ", country = ?" : ""}
            ${req.body.year ? ", year = ?" : ""}
            ${req.body.notes ? ", notes = ?" : ""}
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
                SELECT id, title, author, books.id_author, field, books.id_field, subfield, books.id_subfield, position, books.id_position, language, books.id_language, collection, books.id_collection, country, year, notes
                FROM books
                 LEFT JOIN authors ON books.id_author = authors.id_author
                 LEFT JOIN fields ON books.id_field = fields.id_field
                 LEFT JOIN subfields ON books.id_subfield = subfields.id_subfield AND books.id_field = subfields.id_field
                 LEFT JOIN positions ON books.id_position = positions.id_position
                 LEFT JOIN languages ON books.id_language = languages.id_language
                 LEFT JOIN collections ON books.id_collection = collections.id_collection
                WHERE id = ?;`;
    const [updatedBook] = await db.execute(sqlUpdatedBook, [req.params.id]);

    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
});

/* DELETE BOOK IF DOG EATS IT */
router.delete("/:id", async (req, res, next) => {
  try {
    const sql = `
        DELETE FROM books WHERE id = ?;`;
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
