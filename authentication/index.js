const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const jwtPassword = "123456"

app.use(express.json())


const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];


function userExits(username, password) {
  let userExits = false
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
      userExits =  true
    }
  }
  return userExits;
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExits(username, password)) {
    return res.status(403).json({
      msg: "Invalid username or password"
    })
  }

  var token = jwt.sign({ username: username }, jwtPassword)
  return res.json(
    { token }
  )
})


app.get('/users', function(req, res){
    const token = req.headers.authorization;
    try{
      const decoded = jwt.verify(token, jwtPassword);
      const username = decoded.username;
      res.json({
        users: ALL_USERS.filter((value)=> {
          if(value.username == username){
            return false;
          }
          else {
            return true
          }
        })
      })
    }
    catch(err){
      return res.json({
        msg: "invalid token"
      })
    }
})


app.listen(port);