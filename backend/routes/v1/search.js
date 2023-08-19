const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");

router.get("/:keyword", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;

    const offset = (page - 1) * limit;

    const countSql = `
    SELECT COUNT(*) AS totalCount
    FROM books
    WHERE books.title LIKE ?;
    `;
    const [countRows] = await db.execute(countSql, [`%${req.params.keyword}%`]);
    const totalCount = countRows[0].totalCount;
    const numberOfPages = Math.ceil(totalCount / limit);

    const sql = `
        SELECT id, title, author, books.id_author, field, books.id_field, subfield, books.id_subfield, position, books.id_position, language, books.id_language, collection, books.id_collection, country, year, notes
        FROM books
         LEFT JOIN authors ON books.id_author = authors.id_author
         LEFT JOIN fields ON books.id_field = fields.id_field
         LEFT JOIN subfields ON books.id_subfield = subfields.id_subfield AND books.id_field = subfields.id_field
         LEFT JOIN positions ON books.id_position = positions.id_position
         LEFT JOIN languages ON books.id_language = languages.id_language
         LEFT JOIN collections ON books.id_collection = collections.id_collection
        WHERE books.title
        LIKE ?
        LIMIT ? , ? ;`;

    const [rows] = await db.execute(sql, [
      `%${req.params.keyword}%`,
      `${offset}`,
      `${limit}`,
    ]);

    // if (rows.length === 0) throw new Error("Nothing was found");
    res.send({
      books: rows,
      numberOfPages: numberOfPages,
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
