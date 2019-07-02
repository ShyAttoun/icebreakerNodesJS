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

const pickuplines = [];

app.get('/',function(req,res){
    res.send('welcome to IceBreaker App bro!')});

    const pool = new Pool ({
      connectionString: process.env.DATABASE_URL,ssl: true
      });
      
  app.get('/db', function (req, res) {
      var SQL = "CREATE TABLE Jokes(id SERIAL, setup TEXT)"
      
      pool.query(SQL,function(err,dbResult){6
      
        if(err){
          res.json(err);
        }else{
          res.json(dbResult);
        }
      });
      });

app.get('/api/pickuplines',(req,res) => {
    res.send(pickuplines);
  });
  
  app.get('/api/pickuplines/:id',(req,res) => {
    const pickup = pickuplines.find(c => c.id === parseInt(req.params.id));
    if (!pickup) return res.status(404).send('the course coudlnt be found');
    res.send(pickup)
  });
  
  app.delete('/api/pickuplines/:id',(req,res) => {
    //checks is the adress exists
    const pickup = pickuplines.find(c => c.id === parseInt(req.params.id));
    if (!pickup) return res.status(404).send('the course coudlnt be found');
  
    //delete part
    const index = pickuplines.indexOf(pickup);
    pickuplines.splice(index,1);
  
    //returnibg the same course
    res.send(pickup);
  
  });
  
  
  
  
  app.post('/api/pickuplines',(req,res)=>{
    const {error} = validatePickUpLine(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);
  
    const pickupliner = {
      id: pickuplines.length + 1,
      setup: req.body.setup
    };
  
    pickuplines.push(pickupliner);
    res.send(pickupliner);
    });
  
    app.put('/api/pickuplines/:id',(req,res) => {
  
      const pickup = pickuplines.find(c => c.id === parseInt(req.params.id));
       if (!pickup) return res.status(404).send('the course coudlnt be found');
      
       const {error} = validatePickUpLine(req.body); // result.error
       if (error) return res.status(400).send(error.details[0].message);
         
       pickup.name = req.body.name;
       res.send(pickup);
     
     });

function validatePickUpLine (pickup){
    const schema = {
      setup: Joi.string().min(1).required(),
    
    };
    return Joi.validate(pickup,schema);
  }