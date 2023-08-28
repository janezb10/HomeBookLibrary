const express = require("express");
const router = express.Router();
const db = require("../../config/SQLConfig");

router.get("/:keyword", async (req, res, next) => {
  try {
    const positions = req.query.positions;
    const authors = req.query.authors;
    const languages = req.query.languages;
    const collections = req.query.collections;
    const fields = req.query.fields;

    const positionValues = positions ? positions.split(",").map(Number) : [];
    const authorsValues = authors ? authors.split(",").map(Number) : [];
    const languagesValues = languages ? languages.split(",").map(Number) : [];
    const collectionsValues = collections
      ? collections.split(",").map(Number)
      : [];
    const fieldsValues = fields ? fields.split(",").map(Number) : [];

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const offset = (page - 1) * limit;

    const countSql = `
    SELECT COUNT(*) AS totalCount
    FROM books
    WHERE books.title LIKE ?
        ${
          positions
            ? ` AND books.id_position IN (${positionValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }      
        ${
          authors
            ? ` AND books.id_author IN (${authorsValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }        
        ${
          languages
            ? ` AND books.id_language IN (${languagesValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }        
        ${
          collections
            ? ` AND books.id_collection IN (${collectionsValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }        
        ${
          fields
            ? ` AND books.id_field IN (${fieldsValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }
    ;`;
    const keyword =
      req.params.keyword === "*" ? "%%" : `%${req.params.keyword}%`;

    const [countRows] = await db.execute(countSql, [
      keyword,
      ...positionValues,
      ...authorsValues,
      ...languagesValues,
      ...collectionsValues,
      ...fieldsValues,
    ]);
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
        ${
          positions
            ? ` AND books.id_position IN (${positionValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }      
        ${
          authors
            ? ` AND books.id_author IN (${authorsValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }        
        ${
          languages
            ? ` AND books.id_language IN (${languagesValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }        
        ${
          collections
            ? ` AND books.id_collection IN (${collectionsValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }        
        ${
          fields
            ? ` AND books.id_field IN (${fieldsValues
                .map((e) => "?")
                .join(",")}) `
            : ""
        }
        LIMIT ? , ? ;`;

    const [rows] = await db.execute(sql, [
      keyword,
      ...positionValues,
      ...authorsValues,
      ...languagesValues,
      ...collectionsValues,
      ...fieldsValues,
      `${offset}`,
      `${limit}`,
    ]);

    res.send({
      books: rows,
      // a: sql,
      numberOfPages: numberOfPages,
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
