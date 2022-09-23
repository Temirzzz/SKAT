const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
const PORT = process.env.PORT || 5600;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "72676376";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuthenticated({ username, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.username === username && user.password === password
    ) !== -1
  );
}

server.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (!isLoginAuthenticated({ username, password })) {
    const status = 401;
    const errorMessage = "Не верный логин или пароль!";
    res.status(status).json({ status, errorMessage });
    return;
  }
  const succsessMessage = "Вы успешно залогировались :)";
  const access_token = createToken({ username, password });
  res.status(200).json({ access_token, succsessMessage });
});

server.listen(PORT, () => {
  console.log(`app works on http://localhost:${PORT}`);
});
