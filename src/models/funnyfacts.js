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

const funnyfacts = [];
app.get('/',function(req,res){
    res.send('welcome to IceBreaker App bro!')});

    const pool = new Pool ({
      connectionString: process.env.DATABASE_URL,ssl: true
      });
      
  app.get('/db', function (req, res) {
      var SQL = "CREATE TABLE FunnyFacts (id SERIAL, setup TEXT)"
      
      pool.query(SQL,function(err,dbResult){6
      
        if(err){
          res.json(err);
        }else{
          res.json(dbResult);
        }
      });
      });

app.get('/api/funnyfacts',(req,res) => {
    res.send(funnyfacts);
  });
  
  app.get('/api/funnyfacts/:id',(req,res) => {
    const funnyfact = funnyfacts.find(c => c.id === parseInt(req.params.id));
    if (!funnyfact) return res.status(404).send('the course coudlnt be found');
    res.send(funnyfact)
  });
  
  app.delete('/api/funnyfacts/:id',(req,res) => {
    //checks is the adress exists
    const funnyfact = funnyfacts.find(c => c.id === parseInt(req.params.id));
    if (!funnyfact) return res.status(404).send('the course coudlnt be found');
  
    //delete part
    const index = funnyfacts.indexOf(funnyfact);
    funnyfacts.splice(index,1);
  
    //returnibg the same course
    res.send(funnyfact);
  
  });
  
  app.post('/api/funnyfacts',(req,res)=>{
    const {error} = validateFunnyFacts(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);
  
    const funnyfactor = {
      id: funnyfacts.length + 1,
      setup: req.body.setup
    };
  
    funnyfacts.push(funnyfactor);
    res.send(funnyfactor);
    });
  
    app.put('/api/funnyfacts/:id',(req,res) => {
  
      const funnyfact = funnyfacts.find(c => c.id === parseInt(req.params.id));
       if (!funnyfact) return res.status(404).send('the course coudlnt be found');
      
       const {error} = validateFunnyFacts(req.body); // result.error
       if (error) return res.status(400).send(error.details[0].message);
         
       funnyfact.name = req.body.name;
       res.send(funnyfact);
     
     });

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));

function validateFunnyFacts (funnyfact){
    const schema = {
      setup: Joi.string().min(1).required(),
    
    };
    return Joi.validate(funnyfact,schema);
  }