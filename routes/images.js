const express = require('express')
const mysql = require('mysql')
const router = express.Router()


router.get("/images", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM images"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for images: " + err)
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
router.post('/image_create', (req, res) => {
    console.log("Trying to create a new image...")
    console.log("How do we get the form data???")
  
    console.log("imageUrl: " + req.body.create_imageUrl)
    
    const image = req.body.create_imageUrl
   
  
    const queryString = "INSERT INTO images (imageUrl) VALUES (?)"
    getConnection().query(queryString, [image], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new images: " + err)
        res.sendStatus(500)
        return
      }
      console.log("Inserted a new image with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/images/:id', (req, res) => {
    console.log("Fetching image with id: " + req.params.id)
    const connection = getConnection()

    const imageId = req.params.id
    const queryString = "SELECT * FROM images WHERE id = ?"
    connection.query(queryString, [imageId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for images: " + err)
        res.sendStatus(500)
        return
        // throw err
        }
        console.log(" we fetched images successfully")

        const images = rows.map((row) => {
        return {imageUrl: row.imageUrl}
        })
        res.json(images)
    })
})

module.exports = router