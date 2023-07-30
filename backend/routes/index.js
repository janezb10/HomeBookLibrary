const express = require("express");
const router = express.Router();

router.get("/protected", (req, res) => {
  // Ta pot je zaščitena in za dostop zahteva avtentikacijo
  // Uporabniški podatki so na voljo v req.user
  res.json({
    message: `Dobrodošli, ${req.user.username}! Ta stran je zaščitena.`,
  });
});

module.exports = router;
