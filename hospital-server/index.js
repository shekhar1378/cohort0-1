const express = require("express")
const app = express();
const port =3000;

// Middleware to parse JSON request bodies
app.use(express.json());

const people = [
    { name: 'John',
      kidneys: {
        isHealty: false
      }      
    }
]

app.get("/", (req, res)=> {
    res.send("hjvnjds");
})

app.listen(port);