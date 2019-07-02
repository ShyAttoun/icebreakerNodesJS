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

const jokes = [];

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
app.get('/api/jokes',(req,res) => {
res.send(jokes);});

app.get('/api/jokes/:id',(req,res) => {
const joke = jokes.find(c => c.id === parseInt(req.params.id));
if (!joke) return res.status(404).send('the course coudlnt be found');
res.send(joke)
});

app.delete('/api/jokes/:id',(req,res) => {
//checks is the adress exists
const joke = jokes.find(c => c.id === parseInt(req.params.id));
if (!joke) return res.status(404).send('the course coudlnt be found');

//delete part
const index = jokes.indexOf(joke);
jokes.splice(index,1);

//returnibg the same course
res.send(joke);

});

app.post('/api/jokes',(req,res)=>{

const {error} = validateCourse(req.body); // result.error
if (error) return res.status(400).send(error.details[0].message);

const joker = {
  id: jokes.length + 1,
  setup: req.body.setup,
 punchline: req.body.punchline
};
jokes.push(joker);
res.send(joker);

var SQL = "INSERT INTO Jokes(setup,punchline) VALUES($1,$2);"
var values = [setup,punchline]

pool.query(SQL,values,function(err,dbResult){
        
  if(err){
    res.json(err);
  }else{
    res.json(dbResult);
  }
});
});


app.put('/api/jokes/:id',(req,res) => {
  const joke = jokes.find(c => c.id === parseInt(req.params.id));
   if (!joke) return res.status(404).send('the course coudlnt be found');
  
   const {error} = validateCourse(req.body); // result.error
   if (error) return res.status(400).send(error.details[0].message);
     
   joke.name = req.body.name;
   res.send(joke);
 });

 const port = process.env.PORT || 3000;
 app.listen(port,() => console.log(`Listening on port ${port}...`));

 function validateCourse (joke){
    const schema = {
      setup: Joi.string().min(1).required(),
     punchline: Joi.string().min(1).required()
    };
    return Joi.validate(joke,schema);
  }