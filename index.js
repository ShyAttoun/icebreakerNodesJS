const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(morgan('short'))

const router = require('./routes/jokes.js')
app.use(router)

const router1 = require ('./routes/pickuplines.js')
app.use(router1)

const router2 = require ('./routes/funnyfacts.js')
app.use(router2)

const router3 = require ('./routes/questions.js')
app.use(router3)

const router4 = require ('./routes/images.js')
app.use(router4)

const router5 = require ('./routes/cities.js')
app.use(router5)

const router6 = require ('./routes/food.js')
app.use(router6)

const router7 = require ('./routes/music.js')
app.use(router7)

const router8 = require ('./routes/lifestyle.js')
app.use(router8)

const router9 = require ('./routes/movies.js')
app.use(router9)

const router10 = require ('./routes/associations.js')
app.use(router10)

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOOT")
})

const PORT = process.env.PORT || 3003
// localhost:PORT
app.listen(PORT, () => {
  console.log("Server is up and listening on: " + PORT)
})

