// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()



router.get("/funnyfacts", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM funnyfacts"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for funnyfacts: " + err)
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
router.post('/funnyfact_create', (req, res) => {
    console.log("Trying to create a new funnyfact...")
    console.log("How do we get the form data???")
  
    console.log("setup: " + req.body.create_setup)
    
    const setup = req.body.create_setup
  
  
    const queryString = "INSERT INTO funnyfacts (setup) VALUES (?)  "
    getConnection().query(queryString, [setup], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new funnyfact: " + err)
        res.sendStatus(500)
        return
      }
      console.log("Inserted a new funnyfact with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/funnyfacts/:id', (req, res) => {
    console.log("Fetching funnyfact with id: " + req.params.id)
    const connection = getConnection()

    const funnyfactId = req.params.id
    const queryString = "SELECT * FROM funnyfacts"
    connection.query(queryString, [funnyfactId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for funnyfacts: " + err)
        res.sendStatus(500)
        return
        // throw err
        }
        console.log("I think we fetched funnyfacts successfully")

        const funnyfacts = rows.map((row) => {
        return {setup: row.setup}
        })
        res.json(funnyfacts)
    })
})

module.exports = router
