const { generateJWTToken } = require("../utils/authUtils");

const users = [
  { id: 1, email: "platinab10@gmail.com", password: "passw1" },
  { id: 2, email: "sd@sd.si", password: "passw2" },
];

const handleLogin = (req, res) => {
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
};

module.exports = handleLogin;
