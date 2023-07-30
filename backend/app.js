require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken"); // jwt

const app = express();
const secretKey = "akdkdkd"; // jwt

app.use(express.json());

const users = [
  { id: 1, username: "user1", password: "pass1" },
  { id: 2, username: "user2", password: "pass2" },
];

// Function for generating JWT token
function generateJWTToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// Endpoint to login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //   Check if user is in database
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) {
    return res.status(401).json({ message: "wrong username or password" });
  }
  //   If input data is correct, we generate JWT token and we return it in response
  const token = generateJWTToken({ userId: user.id, username: user.username });
  res.send({ token });
});
// Middleware to check JWT token
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

// Zaščiten endpoint - samo avtenticirani uporabniki lahko dostopajo do tega
app.get("/protected", verifyJWTToken, (req, res) => {
  const user = req.user;
  res.json({ message: `Ẁelcome, ${user.username}! Ta stran je zaščitena.` });
});

app.get("/", (req, res) => {
  res.send("hello");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
