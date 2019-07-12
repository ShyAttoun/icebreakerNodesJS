const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get("/questions", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM questions"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for questions: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
  })
const pool = mysql.createPool({
    connectionLimit: 10,
  host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b912d8ed161fd4',
    password: 'f75edef7',
    database: 'heroku_b01e38876183963'
})
function getConnection() {
    return pool
}
router.post('/question_create', (req, res) => {
    console.log("Trying to create a new question...")
    console.log("How do we get the form data???")
  
    console.log("setup: " + req.body.create_setup)
    
    const setup = req.body.create_setup
   
  
    const queryString = "INSERT INTO questions (setup) VALUES (?)"
    getConnection().query(queryString, [setup], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new question: " + err)
        res.sendStatus(500)
        return
      }
      console.log("Inserted a new question with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/questions/:id', (req, res) => {
    console.log("Fetching joke with id: " + req.params.id)
    const connection = getConnection()

    const questionId = req.params.id
    const queryString = "SELECT * FROM questions WHERE id = ?"
    connection.query(queryString, [questionId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for questions: " + err)
        res.sendStatus(500)
        return
        // throw err
        }
        console.log(" we fetched questions successfully")

        const questions = rows.map((row) => {
        return {setup: row.setup}
        })
        res.json(questions)
    })
})

module.exports = router