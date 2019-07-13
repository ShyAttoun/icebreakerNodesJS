// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get("/food", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM food"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for food: " + err)
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

router.post('/food_create', (req, res) => {
    console.log("Trying to create a new food...")
    console.log("How do we get the form data???")
  
    console.log("food: " + req.body.create_foodname)
    console.log("food image url: " + req.body.create_imageUrl)
    const food = req.body.create_foodname
    const imageUrl = req.body.create_imageUrl
  
    const queryString = "INSERT INTO food (foodName, imageUrl) VALUES (?, ?)"
    getConnection().query(queryString, [food, imageUrl], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new food: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new food with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/food/:id', (req, res) => {
    console.log("Fetching food with id: " + req.params.id)

    const connection = getConnection()

    const foodId = req.params.id
    const queryString = "SELECT * FROM food WHERE id = ?"
    connection.query(queryString, [foodId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for food: " + err)
        res.sendStatus(500)
        return
        // throw err
        }

        console.log("I think we fetched food successfully")

        const food = rows.map((row) => {
        return {food: row.foodName, imageUrl: row.imageUrl}
        })

        res.json(food)
    })
})

module.exports = router