const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get("/associations", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM associations"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for associations: " + err)
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
router.post('/association_create', (req, res) => {
    console.log("Trying to create a new association...")
    console.log("How do we get the form data???")
  
    console.log("associations: " + req.body.create_association)
    
    const association = req.body.create_association
   
  
    const queryString = "INSERT INTO associations (association) VALUES (?)"
    getConnection().query(queryString, [association], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new association: " + err)
        res.sendStatus(500)
        return
      }
      console.log("Inserted a new association with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/associations/:id', (req, res) => {
    console.log("Fetching association with id: " + req.params.id)
    const connection = getConnection()

    const associationId = req.params.id
    const queryString = "SELECT * FROM associations WHERE id = ?"
    connection.query(queryString, [associationId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for associations: " + err)
        res.sendStatus(500)
        return
        // throw err
        }
        console.log(" we fetched associations successfully")

        const associations = rows.map((row) => {
        return {association: row.association}
        })
        res.json(associations)
    })
})

module.exports = router