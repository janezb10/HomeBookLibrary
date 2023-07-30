require("dotenv").config();
const express = require("express");
const app = express();

const { verifyJWTToken } = require("./utils/authUtils");
const handleLogin = require("./middleware/login");
const routes = require("./routes/api"); // routes

app.use(express.json());
app.use(express.static("./static"));

// Endpoint to login
app.post("/login", handleLogin);

// Authenticate Users
app.use(verifyJWTToken);
// Only authenticated users have access
app.use("/api", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
