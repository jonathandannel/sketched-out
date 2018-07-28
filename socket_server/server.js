const express           = require("express");
const SocketServer      = require("ws").Server;
const uuid              = require("uuid/v1");
const PORT              = 8080;
const jwt               = require("jsonwebtoken");
const exjwt             = require("express-jwt");
const bodyParser        = require("body-parser");
const http              = require("http");
const randomstring      = require("randomstring");
const bcrypt            = require("bcryptjs");
const WebSocket         = require('ws');

const server = express();
const httpServer = http.createServer(server);

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const jwtMW = exjwt({
  secret: "secretkey"
});

const users = [
  {
    id: 1,
    username: "test",
    password: "test"
  },
  {
    id: 2,
    username: "mo",
    password: "mo"
  }
];

server.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  for (let user of users) {
    if (username == user.username && bcrypt.compareSync(password, user.password)) {
      let token = jwt.sign(
        { id: user.id, username: user.username },
        "secretkey",
        { expiresIn: 129600 }
      );
      res.json({
        success: true,
        err: null,
        token
      });
      return;
    }
  }
  res.status(401).json({
    success: false,
    token: null,
    err: "Username or password incorrect"
  });
});

server.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let exists = false;

  for (let user of users) {
    if (username == user.username) {
      exists = true;
    }
  }

  if (exists === true) {
    res.status(401).json({
      success: false,
      token: null,
      err: "Username already exists"
    });
  } else {
    //Before setting token, lets add the user to the database
    let hashedPassword = bcrypt.hashSync(password, 10);
    let randomID = randomstring.generate(6);

    newUser = {
      id: randomID,
      username: username,
      password: hashedPassword
    };

    console.log(newUser, "newuser before push")
    users.push(newUser)

    console.log(users, "after push")
    //Now we set the token
    let token = jwt.sign(
      { id: users.id, username: users.username },
      "secretkey",
      { expiresIn: 129600 }
    );
    res.json({
      success: true,
      err: null,
      token
    });
    return;
  }
});

server.get("/", jwtMW, (req, res) => {
  res.send("You are authenticated");
});

server.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

const wss = new SocketServer({ server: httpServer });
wss.on("connection", (ws, req) => {
  console.log("==> User connected!");

  ws.on('message', (data) => {
    console.log(data)
    wss.clients.forEach((client) => {
      if (client!== ws && client.readyState === WebSocket.OPEN)
      client.send(data);
    })
  });

  ws.on("close", () => console.log("Client disconnected"));
});

httpServer.listen(PORT, "0.0.0.0", "localhost", () =>
  console.log(`==> Sketched Out websocket server listening on ${PORT}`)
);
