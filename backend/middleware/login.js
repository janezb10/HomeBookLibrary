const { generateJWTToken } = require("../utils/authUtils");
const db = require("../config/SQLConfig");

// const users = [
//   { id: 1, email: "platinab10@gmail.com", password: "passw1" },
//   { id: 2, email: "sd@sd.si", password: "passw2" },
// ];

const handleLogin = async (req, res, next) => {
  const { username, password } = req.body;
  //   Check if user is in database
  if (!username || !password) {
    return res.status(401).json({ message: "wrong!" });
  }
  try {
    const sql = `
        SELECT *
        FROM userData
        WHERE userData.user_name
        LIKE ?`;
    const [result] = await db.execute(sql, [username]);
    if (
      Boolean(result[0]) &&
      result[0].user_name === username &&
      result[0].password === password
    ) {
      const token = generateJWTToken({
        userId: result[0].id,
        username: result[0].username,
      });
      res.send({ token });
    } else {
      return res.status(401).json({ message: "wrong username or password" });
    }
  } catch (err) {
    next(err);
  }
};
//   const user = users.find((u) => u.email === email && u.password === password);
//   if (!user) {
//     return res.status(401).json({ message: "wrong username or password" });
//   }
//   //   If input data is correct, we generate JWT token and we return it in response
//   const token = generateJWTToken({ userId: user.id, username: user.username });
//   res.send({ token });
// };

module.exports = handleLogin;

// try {
//   const { username, password } = req.body;
//   const sql = `
//         SELECT *
//         FROM userData
//         WHERE userData.user_name
//         LIKE ?`;
//   console.log("aaaa", username);
//   const [result] = await db.execute(sql, [username]);
//   console.log(result);
//   res.send(result);
// } catch (err) {
//   next(err);
// }
