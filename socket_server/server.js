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
const routes            = require('./routes')
const server            = express();
const httpServer        = http.createServer(server);


// Database Connection
const MongoClient = require('mongodb').MongoClient
const MONGODB_URI = "mongodb://localhost:27017/sketchedout"


MongoClient.connect(MONGODB_URI)
  .then(db => {
    console.log(`Connected to mongodb: ${MONGODB_URI}`)

    server.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
      next();
    });

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
      extended: true
    }));

    routes(server, db)

    /********* ROOM STATE *********/

    const users = [];
    const canvas = [];
    const roomState = {
      type: "",
      content: {
        currentClue: "",
      }
    }

    /******************************/

    const wss = new SocketServer({
      server: httpServer
    });

    wss.on("connection", (ws, req) => {
      console.log("==> User connected!");

      ws.on('message', (data) => {
        const message = JSON.parse(data);

        switch (message.type) {

          case 'roomJoin':
            console.log('=> room join', message.content)
            users.push(message.content)
            let outgoing = {
              type: 'userList',
              content: users
            }
            wss.clients.forEach((client) => {
              client.send(JSON.stringify(outgoing));
            })
          break;

          case 'receiveLatestCanvasData':
            let outgoingCanvas = {
              type: 'latestCanvas',
              content: canvas
            }
            ws.send(JSON.stringify(outgoingCanvas))
          break;

          case 'chatMessages':
            wss.clients.forEach((client) => {
              client.send(data);
            })
          break;

          case 'latestLineData':
            console.log(message.content)
            message.content.forEach((line) => {
              canvas.push(line);
            });
            wss.clients.forEach((client) => {
              client.send(data);
            })
          break;

          case 'startingRound':
            console.log(message.content)
            let outgoingStartRound = {
              type: 'startingRound',
              content: message.content.currentClue
            }

            wss.clients.forEach((client) => {
              client.send(JSON.stringify(outgoingStartRound))
            })
          break;

        }



      ws.on("close", () => console.log("Client disconnected"));
    });
  })


    httpServer.listen(PORT, "0.0.0.0", "localhost", () =>
      console.log(`==> Sketched Out websocket server listening on ${PORT}`)
    )
  })
  .catch(err => {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err
  })
