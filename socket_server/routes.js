const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const dbHelpers = require ('./db/data-helpers')
const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");


module.exports = function routes(server, db) {

  const dataHelpers = dbHelpers(db)

  const jwtMW = exjwt({
    secret: "secretkey"
  });

  // const users = [{
  //     id: 1,
  //     username: 'a',
  //     password: '$2a$10$IfTDfRm6FLb2rv3PfRKwEOedzNe0TbBMIeZPb2XxTe4HUf3kG3caa'
  //   },
  //   {
  //     id: 2,
  //     username: 'mo',
  //     password: '$2a$10$IfTDfRm6FLb2rv3PfRKwEOedzNe0TbBMIeZPb2XxTe4HUf3kG3caa'
  //   }
  // ];

  server.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    dataHelpers.getUsers().then(users => {
      console.log(users)
      for (let user of users) {
        if (username == user.username && bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({
              id: user.id,
              username: user.username
            },
            "secretkey", {
              expiresIn: 129600
            }
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
    }).catch(err =>{
      console.log(err)
    })
  })
    

  server.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let exists = false;

    dataHelpers.getUsers().then(users => {
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
        // users.push(newUser)
        dataHelpers.saveUsers(newUser)
        //Now we set the token
        let token = jwt.sign({
            id: users.id,
            username: users.username
          },
          "secretkey", {
            expiresIn: 129600
          }
        );
        res.json({
          success: true,
          err: null,
          token
        });
        return;
      }
    }).catch(err =>{
      console.log(err)
    })
  })

  server.get("/", jwtMW, (req, res) => {
    res.send("You are authenticated");
  });

  server.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).send(err);
    } else {
      next(err);
    }
  });

}