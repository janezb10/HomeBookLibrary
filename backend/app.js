require("dotenv").config();
const express = require("express");
const app = express();
const { generateJWTToken, verifyJWTToken } = require("./utils/authUtils");

const routes = require("./routes/index"); // routes

app.use(express.json());
app.use(express.static("./static"));

const users = [
  { id: 1, username: "user1", password: "pass1" },
  { id: 2, username: "user2", password: "pass2" },
];

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

// Authenticate Users
app.use(verifyJWTToken);
// Only authenticated users have access
app.use("/", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
