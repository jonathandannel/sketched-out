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
const moment = require('moment');


const clues             = require('../src/lib/clues.js')


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

    // const users = [];
    // const canvas = [];
    // const roomState = {
    //   type: "",
    //   content: {
    //     currentClue: "",
    //   }
    // }

    const players = ['ONE', 'TWO', 'three'];

    const GAME = {
      roomId: 1,
      players: players,
      canvas: [],
      currentlyDrawing: players[0],
      gameStarted: false,
      startTime: '',
      startTimer: false,
      currentClue: ''
    }


    /******************************/
          // GAME Functions


    const getClue = () => {
      let currentClue = clues[Math.floor(Math.random() * (clues.length + 1))];
      GAME.currentClue = currentClue;
    }

    const setCurrentlyDrawing = () => {
      let i = (players.indexOf(GAME.currentlyDrawing) + 1) % players.length;
      GAME.currentlyDrawing = GAME.players[i]
    }

    getTimeRemaining = () => {
      if (GAME.gameStarted) {
      secondsLeft = 30 - Math.floor(moment().diff(GAME.startTime) / 1000)
      console.log(secondsLeft, "sec left");
      } if (secondsLeft === 0) {
      } if (secondsLeft > 0) {
        setTimeout(() => {
          getTimeRemaining();
          }, 1000)
      }
      return secondsLeft
    }

    const startRound = () => {
      getClue();
      setCurrentlyDrawing()
      GAME.startTime = moment()
      GAME.gameStarted = true;
      let message = {
        type: 'roundStarted',
        content: GAME
      }
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
      })
      console.log(GAME)
    }



    /******************************/

    const wss = new SocketServer({
      server: httpServer
    });

    wss.on("connection", (ws, req) => {
      console.log("==> User connected!");


      startRound();

      let time = 30

      setInterval(() => {
        time --;
        let outgoing = {
          type: 'timer',
          content: time
        }

        wss.clients.forEach((client) => {
          client.send(JSON.stringify(outgoing))
        })
        console.log('sending timer', time)
      }, 1000)

      ws.on('message', (data) => {
        const message = JSON.parse(data);

        switch (message.type) {
          case 'latestLineData':
            console.log(message.content)
            message.content.forEach((line) => {
              GAME.canvas.push(line);
            });
            wss.clients.forEach((client) => {
              client.send(data);
            })
          break;
          case 'receiveLatestCanvasData':
            let outgoingCanvas = {
              type: 'latestCanvas',
              content: GAME.canvas
            }
            ws.send(JSON.stringify(outgoingCanvas))
          break;
          case 'chatMessages':
            wss.clients.forEach((client) => {
              client.send(data);
            })
          break;
          case 'roomJoin':
            players.push(message.content)
            let outgoing = {
              type: 'userList',
              content: GAME.players
            }
            wss.clients.forEach((client) => {
              client.send(JSON.stringify(outgoing));
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
