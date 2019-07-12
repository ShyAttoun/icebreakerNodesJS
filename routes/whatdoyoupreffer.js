// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get("/cities", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM cities"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for cities: " + err)
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

router.post('/city_create', (req, res) => {
    console.log("Trying to create a new city...")
    console.log("How do we get the form data???")
  
    console.log("First name: " + req.body.create_first_name)
    const city = req.body.create_cityname
    const imageUrl = req.body.create_cityUrl
  
    const queryString = "INSERT INTO cities (cityName, imageUrl) VALUES (?, ?)"
    getConnection().query(queryString, [city, imageUrl], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new city: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new city with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/cities/:id', (req, res) => {
    console.log("Fetching city with id: " + req.params.id)

    const connection = getConnection()

    const cityId = req.params.id
    const queryString = "SELECT * FROM cities WHERE id = ?"
    connection.query(queryString, [cityId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for cities: " + err)
        res.sendStatus(500)
        return
        // throw err
        }

        console.log("I think we fetched cities successfully")

        const cities = rows.map((row) => {
        return {city: row.cityName, lastName: row.imageUrl}
        })

        res.json(cities)
    })
})

module.exports = router