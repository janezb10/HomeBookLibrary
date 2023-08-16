const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

// Function for generating JWT token
function generateJWTToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
}

// verify JWT token
function verifyJWTToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // We get the JWT token from the authorization header

  if (!token) {
    return res.status(401).json({ message: "Missing authorization token" });
  }
  //   We check and decode JWT token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Neveljaven avtotizacijski žeton." });
    }
    req.user = decoded; // Dodamo dekodirane podatke iz žetona
    next();
  });
}

module.exports = {
  generateJWTToken,
  verifyJWTToken,
};
