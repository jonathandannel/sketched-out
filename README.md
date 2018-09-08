# Sketched Out

Sketched Out is a real-time multiplayer Pictionary-style online drawing game. Players join a room and take turns drawing while the others use the chat to guess what they drew. Sketched Out was built with React, Express, and Websockets. 



## Setup

- Clone the repo to your local machine.
- Run `npm install` in the root directory to install all required dependencies. 
- Run `npm start` to run the webpack server. 
- In another terminal, CD into the /socket_server directory  and run `node server.js` to start the socket server. 
- Visit `localhost:3000` and start playing!


## How it Works

Show off your artistic skills by drawing the word you are given when it's your turn to draw. The timer at the top of the canvas lets you know how much time you have left, and you have a variety of colors and brush thicknesses to choose from. Everything you draw is rendered in real time to all other connected clients.

If someone can guess what you drew, you are both awarded points! More points are awarded for a quick guess. 

Fight for a spot on the main leaderboard. Every time you exit a game, the points you accumulated are added to your total. Try to end up on top!


## Setup

- Clone the repo to your local machine.
- Run `npm install` in the root directory to install all required dependencies. 
- Run `npm start` to run the webpack server. 
- In another terminal, CD into the /socket_server directory  and run `node server.js` to start the socket server. 
- Visit `localhost:3000` and start playing!


## Dependencies 

- npm
- react
- react-router
- ws
- express 
- mongoDB
- material-ui/core
- moment 
- jsonwebtoken
- bcrypt
- uuid 
- body-parser
- progressbar
- rc-progress


## Thank you
Sketched Out was created by Jonathan Dannel, Monique Khoury, Gerry Suwignyo, and Farid Manafov as part of the Lighthouse Labs developer bootcamp, where it landed at first place on the final Demo Day. We sincerely appreciate the support we received before, during, and after its completion! 

