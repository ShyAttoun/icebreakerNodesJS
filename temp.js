const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))

app.get('/',(req,res)=> {
  res.send("welcome to my world!")
  res.end()
})

app.get('/jokes/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fuckyou12',
    database: 'icebreaker_jokes'
  })

  const userId = req.params.id
  const queryString = "SELECT * FROM jokes WHERE id = ?"
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
      // throw err
    }

    console.log("I think we fetched users successfully")

    const jokes = rows.map((row) => {
      return {setup: row.setup, punchline: row.punchline}
    })

    res.json(jokes)
  })

  // res.end()
})

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOOT")
})

app.get("/jokes", (req, res) => {
  var user1 = {firstName: "Stephen", lastName: "Curry"}
  const user2 = {firstName: "Kevin", lastName: "Durant"}
  res.json([user1, user2])
})

// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})
