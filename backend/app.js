require("dotenv").config();
const express = require("express");
const app = express();

const { verifyJWTToken } = require("./utils/authUtils");
// const handleLogin = require("./middleware/login");
const routes = require("./routes/api"); // routes
const cors = require("cors");
const authRoutes = require("./routes/auth");

app.use(express.json());
// Enable CORS
app.use(cors());
app.use(express.static("./static"));

app.get("/test", (req, res) => {
  res.send("aaaa neki neki dela");
});

// Endpoint to login
app.use("/auth", authRoutes);

// Authenticate Users
app.use(verifyJWTToken);
// Only authenticated users have access
app.use("/api", routes);

// Global Error Handler.
app.use((err, req, rest) => {
  console.log("error: " + err.stack);
  console.log("error: " + err.name);
  console.log("error: " + err.code);

  res.status(500).json({
    errorMessage: err.message || "Something went realy wrong",
  });
});

const port = 3010;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
