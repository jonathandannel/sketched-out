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
const moment            = require('moment');
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
      correctGuesser: '',
      drawerPoints: 0,
      guesserPoints: 0,
      lastDrawerWin: ''
    }


    /******************************/
          // GAME Functions

    let timerInterval = null;

    const getClue = () => {
      let currentClue = clues[Math.floor(Math.random() * (clues.length + 1))];
      GAME.currentClue = currentClue;
    }

    const setCurrentlyDrawing = () => {
      GAME.currentlyDrawing = GAME.players[0].username;

      if (GAME.players.length === 1) {
        GAME.nextGuesser = GAME.players[0].username;
      } else {
        GAME.nextGuesser = GAME.players[1].username;
      }
      let first = GAME.players.shift()
      GAME.players.push(first);
   }

    guesserPoints = () => {
      if (GAME.correctGuesser !== '') {
        GAME.players.map(player => {
        newGuessPoints = 100 - ((GAME.secondsLeft) * 3);
          if (player.username === GAME.correctGuesser) {
            player.points += newGuessPoints;
            player.correctGuesses ++;
          }
        })
        return newGuessPoints;
      }
    }

    drawerPoints = () => {
      if (GAME.correctGuesser !== '') {
        newDrawPoints = 150 - ((GAME.secondsLeft) * 4);
        GAME.players.map(player => {
          if (player.username === GAME.currentlyDrawing) {
            player.points += newDrawPoints;
          }
        })
        return newDrawPoints;
      }
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
      GAME.secondsLeft = 30;
      GAME.currentlyDrawing = '';
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
      GAME.drawerPoints = drawerPoints();
      GAME.guesserPoints = guesserPoints();
      GAME.correctGuesser = '';
      GAME.secondsLeft = 0;
      GAME.gameStarted = false;
      clearInterval(timerInterval);
      GAME.canvas = [];

      let message = {
        type: 'clearCanvas',
        content: ''
      }

      let guesserPointDistribution = {
        type: 'guesserPoints',
        content: GAME.guesserPoints
      }

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(message))
      })

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(guesserPointDistribution))
      })

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
              GAME.lastDrawerWin = GAME.currentlyDrawing;
              setTimeout(() => {
                wss.clients.forEach((client) => {
                  client.send(JSON.stringify({
                    type: 'chatMessages',
                    content: {
                      username: 'Sketchbot',
                      text: `${message.content.username} guessed correctly! (Awarded ${GAME.guesserPoints} points.)`
                    }
                  }))
                  client.send(JSON.stringify({
                    type: 'chatMessages',
                    content: {
                      username: 'Sketchbot',
                      text: `${GAME.lastDrawerWin} got ${GAME.drawerPoints} points for an awesome drawing!`
                    }
                  }))
                })
              }, 100)
              endRound();
            }
            wss.clients.forEach((client) => {
              client.send(data);
            })
          break;
          case 'roomJoin':
            let newPlayer = {username: message.content, points: 0, correctGuesses: 0}
            GAME.players.push(newPlayer)
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
            GAME.players.map(player => {
              if (player.username === message.content) {
                let index = GAME.players.indexOf(player);
                if (index > -1) {
                  GAME.players.splice(index, 1);
                  // ADD PLAYER'S POINTS TO THE DATABASE -------
                }
              }
            })
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


    })
  })


    httpServer.listen(PORT, "0.0.0.0", "localhost", () =>
      console.log(`==> Sketched Out websocket server listening on ${PORT}`)
    )
  })

  .catch(err => {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err
  })
