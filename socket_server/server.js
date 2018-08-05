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

    // if (err) throw err;
    // var dbo = db.db("mydb");
    // var query = { username: "Gerry" };
    // dbo.collection("customers").find(query).toArray(function (err, result) {
    //   if (err) throw err;
    //   console.log(result);
    // });
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
      extended: true
    }));

    routes(server, db)

    /********* ROOM STATE *********/


    const GAME = {
      roomId: 1,
      players: [],
      canvas: [],
      currentlyDrawing: null,
      nextGuesser: null,
      gameStarted: false,
      startTimer: false,
      currentClue: '',
      secondsLeft: 30,
      correctGuesser: ''
    }


    /******************************/
          // GAME Functions

    let timerInterval = null;

    const getClue = () => {
      let currentClue = clues[Math.floor(Math.random() * (clues.length + 1))];
      GAME.currentClue = currentClue;
    }

    const setCurrentlyDrawing = () => {
      if (GAME.currentlyDrawing === null){
        let i = 0
        GAME.currentlyDrawing = GAME.players[i]
        GAME.nextGuesser = GAME.players[i + 1]
      } else {
        i = (GAME.players.indexOf(GAME.currentlyDrawing) + 1) % GAME.players.length;
        GAME.currentlyDrawing = GAME.players[i]
        let j = (i + 1) % GAME.players.length;
        GAME.nextGuesser = GAME.players[j]
      }
      console.log("next", GAME.nextGuesser)
    }

    guesserPoints = () => {
      newGuessPoints = 100 - ((GAME.  secondsLeft) * 3);
      return newGuessPoints;
      // add points to db
      //user.correct_guesses ++
    }

    drawerPoints = () => {
      newDrawPoints = 150 - ((GAME. secondsLeft) * 4);
      return newDrawPoints;
      //add points to db
    }


    const startTimer = () => {
      GAME.secondsLeft = 30;
      timerInterval = setInterval(() => {
        if (GAME.secondsLeft === 0) {
          endRound()
        } else {
          GAME.secondsLeft --;
          let outgoing = {
            type: 'timer',
            content: GAME.secondsLeft
          }

          wss.clients.forEach((client) => {
            client.send(JSON.stringify(outgoing))
          })
        }
        console.log('sending timer', GAME.secondsLeft)
      }, 1000)
    }

    const startRound = () => {
      GAME.secondsLeft = 30
      let outgoing = {
        type: 'timer',
        content: GAME.secondsLeft
      }

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(outgoing))
      })
      let gameTimeout = setTimeout(()=> {
        startTimer();
        setCurrentlyDrawing()
        getClue();
        GAME.gameStarted = true;
        let message = {
          type: 'roundStarted',
          content: GAME
        }
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(message));
        })
        console.log(GAME)
      }, 3000)

    }

    const endRound = () => {
      drawerPoints();
      guesserPoints();
      GAME.correctGuesser = '';
      GAME.secondsLeft = 0;
      GAME.gameStarted = false;
      clearInterval(timerInterval);
      GAME.canvas = [];

      let message = {
        type: 'clearCanvas',
        content: ''
      }

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(message))
      })

      wss
      startRound()
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
          case 'latestLineData':
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
            if (message.content.text.includes(GAME.currentClue)) {
              GAME.correctGuesser = message.content.username
              setTimeout(() => {
                wss.clients.forEach((client) => {
                  client.send(JSON.stringify({
                    type: 'chatMessages',
                    content: {
                      username: 'Sketchbot',
                      text: `${message.content.username} guessed correctly!`
                    }
                  }))
                })
              }, 300)
              endRound();
            }
            wss.clients.forEach((client) => {
              client.send(data);
            })
          break;
          case 'roomJoin':
            GAME.players.push(message.content)
            let outgoing = {
              type: 'userList',
              content: GAME.players
            }
            wss.clients.forEach((client) => {
              client.send(JSON.stringify(outgoing));
            })
            console.log("Room join", GAME.players)
          break;
          case 'roomLeave':
            let index = GAME.players.indexOf(message.content);
            if (index > -1) {
              GAME.players.splice(index, 1);
              console.log("ROOM EXIT MESSAGE", GAME.players)
            }
          break;
          case 'beginRound':
            startRound();
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
          case 'userClearCanvas':
            GAME.canvas = [];
            let clearCanvas = {
              type: 'clearCanvas',
              content: ''
            }
            wss.clients.forEach((client) => {
              client.send(JSON.stringify(clearCanvas));
            })
          break;
          case 'changeBrushSize':
            let outgoingMsg = {
              type: 'changeBrushSize',
              content: message.content
            }

            wss.clients.forEach((client) => {
              client.send(JSON.stringify(outgoingMsg))
            })
          break;
        }


      ws.on("close", () => {
        console.log("Client disconnected")
      })


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
