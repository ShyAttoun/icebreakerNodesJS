// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get('/messages', (req, res) => {
  console.log("11111111")
  res.end()
})

router.get("/jokes", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM jokes"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for jokes: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
  })

const pool = mysql.createPool({
    connectionLimit: 10,
  host: 'localhost',
    user: 'root',
    password: 'fuckyou12',
    database: 'icebreaker_jokes'
})

function getConnection() {
    return pool
}

router.post('/joke_create', (req, res) => {
    console.log("Trying to create a new user...")
    console.log("How do we get the form data???")
  
    console.log("setup: " + req.body.create_setup)
    const setup = req.body.create_setup
    const punchline = req.body.create_punchline
  
    const queryString = "INSERT INTO jokes (setup, punchline) VALUES (?, ?)"
    getConnection().query(queryString, [setup, punchline], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new joke: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new joke with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const userId = req.params.id
    const queryString = "SELECT * FROM jokes WHERE id = ?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for jokes: " + err)
        res.sendStatus(500)
        return
        // throw err
        }

        console.log("I think we fetched jokes successfully")

        const jokes = rows.map((row) => {
        return {setup: row.setup, punchline: row.punchline}
        })

        res.json(jokes)
    })
})

module.exports = router