const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
const PORT = 8080;
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bodyParser = require('body-parser')
const http = require('http');


const server = express();
const httpServer = http.createServer(server);

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const jwtMW = exjwt({
  secret: 'secretkey'
});

const users = [
  {
    id: 1,
    username: 'test',
    password: 'test'
  },
  {
    id: 2,
    username: 'mo',
    password: 'mo'
  }
];

server.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  for (let user of users) {
    if (username == user.username && password == user.password) {
      let token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: 129600 })
      res.json({
        success: true,
        err: null,
        token
      })
      return;
    }
  }
  res.status(401).json({
    success: false,
    token: null,
    err: 'Username or password incorrect'
  })
});

server.get('/', jwtMW, (req, res) => {
  res.send('You are authenticated')
});

server.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err);
  } else {
    next(err)
  }
});

const wss = new SocketServer({ server: httpServer });
wss.on('connection', (ws, req) => {
  console.log('==> User connected!')

  ws.on('message', (data) => {
    console.log(data);
    let parsedData = JSON.parse(data);
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(parsedData));
    })
  });

  ws.on('close', () => console.log('Client disconnected'));
});


httpServer.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`==> Sketched Out websocket server listening on ${ PORT }`));
