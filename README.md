# Sketched Out

Sketched Out is a real-time Pictionary-style online drawing game. Multiple players join a room and take turns drawing while the others use the chat to guess what they drew. 


## Setup

run `npm start` to download all the required dependencies. This project runs on two servers. From the main project directory, run `npm start` to start the React server. In a second terminal, open the `socket_server` directory and run `node server.js`. Now you're up and running! Open your browser to `localhost:3000` to start playing. 


## How it Works

Show off your art skills by drawing out the keyword you are provided. Everything you draw is rendered in real time to all the other players. It's like magic!


If someone can guess what you drew, you and they both get points! More points are awarded for a quick guess. 


Fight for a spot on our main leaderboard. Every time you exit a game, the points you accumulated are added to your total. Try to end up on top!


## Tech Stack

React JS
Node JS
WebSockets
Material UI


## Dependencies 

material-ui/core: ^1.4.1,
body-parser: ^1.18.3,
express: ^4.16.3,
express-jwt: ^5.3.1,
jsonwebtoken: ^8.3.0,
jwt-decode: ^2.2.0,
bcryptjs: ^2.4.3,
moment: ^2.22.2,
mongodb: ^2.2.36,
progressbar.js: ^1.0.1,
randomcolor: ^0.5.3,
randomstring: ^1.1.5,
rc-progress: ^2.2.5,
react: 16.4.1,
react-color: ^2.14.1,
react-dom: 16.4.1,
react-progressbar.js: ^0.2.0,
react-router: ^4.3.1,
react-router-dom: ^4.3.1,
react-sketch: ^0.4.4,
uuid: ^3.3.2,
ws: ^6.0.0



