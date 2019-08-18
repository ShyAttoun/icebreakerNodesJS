// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()



router.get("/pickuplines", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM pickuplines"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for pickuplines: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
  })
const pool = mysql.createPool({
    connectionLimit: 10,
  host: '********************',
    user: '************',
    password: '**********',
    database: '************'
})
function getConnection() {
    return pool
}
router.post('/pickupline_create', (req, res) => {
    console.log("Trying to create a new pickupline...")
    console.log("How do we get the form data???")
  
    console.log("setup: " + req.body.create_setup)
    
    const setup = req.body.create_setup
  
  
    const queryString = "INSERT INTO pickuplines (setup) VALUES (?)  "
    getConnection().query(queryString, [setup], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new pickupline: " + err)
        res.sendStatus(500)
        return
      }
      console.log("Inserted a new pickupline with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/pickuplines/:id', (req, res) => {
    console.log("Fetching pickupline with id: " + req.params.id)
    const connection = getConnection()

    const pickuplineId = req.params.id
    const queryString = "SELECT * FROM pickuplines"
    connection.query(queryString, [pickuplineId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for pickuplines: " + err)
        res.sendStatus(500)
        return
        // throw err
        }
        console.log("I think we fetched pickuplines successfully")

        const pickuplines = rows.map((row) => {
        return {setup: row.setup}
        })
        res.json(pickuplines)
    })
})

module.exports = router
