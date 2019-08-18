// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get("/music", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM music"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for music: " + err)
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

router.post('/music_create', (req, res) => {
    console.log("Trying to create a new artist...")
    console.log("How do we get the form data???")
  
    console.log("artist: " + req.body.create_artistname)
    console.log("artist image url: " + req.body.create_imageUrl)
    const artist = req.body.create_artistname
    const imageUrl = req.body.create_imageUrl
  
    const queryString = "INSERT INTO music (artistName, imageUrl) VALUES (?, ?)"
    getConnection().query(queryString, [artist, imageUrl], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new artist: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new artist with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/music/:id', (req, res) => {
    console.log("Fetching music with id: " + req.params.id)

    const connection = getConnection()

    const artistId = req.params.id
    const queryString = "SELECT * FROM music WHERE id = ?"
    connection.query(queryString, [artistId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for music: " + err)
        res.sendStatus(500)
        return
        // throw err
        }

        console.log("I think we fetched music successfully")

        const music = rows.map((row) => {
        return {artist: row.artistName, imageUrl: row.imageUrl}
        })

        res.json(music)
    })
})

module.exports = router
