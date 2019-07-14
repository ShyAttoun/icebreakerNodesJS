// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get("/lifestyle", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM lifestyle"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for lifestyle: " + err)
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

router.post('/lifestyle_create', (req, res) => {
    console.log("Trying to create a new lifestyle...")
    console.log("How do we get the form data???")
  
    console.log("lifestyle type: " + req.body.create_lifestyletype)
    console.log("artist image url: " + req.body.create_imageUrl)
    const lifestyle = req.body.create_lifestyletype
    const imageUrl = req.body.create_imageUrl
  
    const queryString = "INSERT INTO lifestyle (lifestyle, imageUrl) VALUES (?, ?)"
    getConnection().query(queryString, [lifestyle, imageUrl], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new lifestyle type: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new lifestyle type with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/lifestyle/:id', (req, res) => {
    console.log("Fetching lifestyle with id: " + req.params.id)

    const connection = getConnection()

    const lifestyleId = req.params.id
    const queryString = "SELECT * FROM lifestyle WHERE id = ?"
    connection.query(queryString, [lifestyleId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for lifestyle: " + err)
        res.sendStatus(500)
        return
        // throw err
        }

        console.log("I think we fetched lifestyle successfully")

        const lifestyle = rows.map((row) => {
        return {lifestyle: row.lifestyletype, imageUrl: row.imageUrl}
        })

        res.json(lifestyle)
    })
})

module.exports = router