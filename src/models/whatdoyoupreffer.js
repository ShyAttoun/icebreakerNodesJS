const express = require('express');
const Joi = require('joi');
const { Pool } = require('pg');
var bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.json());


const music = [];
const food = [];
const cities = [];
const movies = [];
app.get('/',function(req,res){
    res.send('welcome to IceBreaker App bro!')});

    const pool = new Pool ({
      connectionString: process.env.DATABASE_URL,ssl: true
      });
      
  app.get('/db', function (req, res) {
      var SQL = "CREATE TABLE Jokes(id SERIAL, setup TEXT, punchline TEXT)"
      
      pool.query(SQL,function(err,dbResult){6
      
        if(err){
          res.json(err);
        }else{
          res.json(dbResult);
        }
      });
      });


const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));