require("dotenv").config();
const express = require("express");
const app = express();

const { verifyJWTToken } = require("./utils/authUtils");
// const handleLogin = require("./middleware/login");
const routes = require("./routes/api"); // routes
const cors = require("cors");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(express.static("./static"));

// Endpoint to login
app.use("/auth", authRoutes);

// Enable CORS
app.use(cors());

// Authenticate Users
app.use(verifyJWTToken);
// Only authenticated users have access
app.use("/api", routes);

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
