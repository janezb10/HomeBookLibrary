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
    FROM knjige
    WHERE naslov LIKE ?;
    `;
    const [countRows] = await db.execute(countSql, [`%${req.params.keyword}%`]);
    const totalCount = countRows[0].totalCount;
    const numberOfPages = Math.ceil(totalCount / limit);

    const sql = `
 SELECT id, naslov, avtor, knjige.id_avtor, podrocje, knjige.id_podrocje, podpodrocje, knjige.id_podpodrocje, pozicija, knjige.id_pozicija, jezik, knjige.id_jezik, zbirka, knjige.id_zbirka, drzava, leto, opombe
        FROM knjige
        LEFT JOIN avtor ON knjige.id_avtor = avtor.id_avtor
        LEFT JOIN podrocje ON knjige.id_podrocje = podrocje.id_podrocje
        LEFT JOIN podpodrocje ON knjige.id_podpodrocje = podpodrocje.id_podpodrocje AND knjige.id_podrocje = podpodrocje.id_podrocje
        LEFT JOIN pozicija ON knjige.id_pozicija = pozicija.id_pozicija
        LEFT JOIN jezik ON knjige.id_jezik = jezik.id_jezik
        LEFT JOIN zbirka ON knjige.id_zbirka = zbirka.id_zbirka
        WHERE naslov
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
