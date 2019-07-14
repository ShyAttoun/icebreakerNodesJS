// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get("/movies", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM movies"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for movies: " + err)
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

router.post('/movie_create', (req, res) => {
    console.log("Trying to create a new movie...")
    console.log("How do we get the form data???")
  
    console.log("movie name: " + req.body.create_movie)
    console.log("movie image url: " + req.body.create_imageUrl)
    const movie = req.body.create_movie
    const imageUrl = req.body.create_imageUrl
  
    const queryString = "INSERT INTO movies (movieName, imageUrl) VALUES (?, ?)"
    getConnection().query(queryString, [movie, imageUrl], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new movie name: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new movie name with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/movies/:id', (req, res) => {
    console.log("Fetching movie with id: " + req.params.id)

    const connection = getConnection()

    const movieId = req.params.id
    const queryString = "SELECT * FROM movies WHERE id = ?"
    connection.query(queryString, [movieId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for movies: " + err)
        res.sendStatus(500)
        return
        // throw err
        }

        console.log("I think we fetched movies successfully")

        const movies = rows.map((row) => {
        return {Movie: row.movieName, imageUrl: row.imageUrl}
        })

        res.json(movies)
    })
})

module.exports = router