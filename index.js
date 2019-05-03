const express = require('express');
const Joi = require('joi');
const app = express ();

app.use(express.json());

const jokes = [
  {id: 1, setup: 'what is your name?', punchline : 'daddy boy!!!'},
  {id: 2, setup: 'what is your height?', punchline : '183'},
  {id: 3, setup: 'what is your wieght?', punchline : '82'},
];

const pickuplines = [
  {id: 1, setup: 'I`d walk a million miles over broken glass just to meet the guy that fucked you last.'},
  {id: 2, setup: 'You can touch mine if I can touch yours with mine.'},
  {id: 3, setup: 'I think we have to make love on the front lawn like crazed weasels NOW!'},
];

const funnyfacts = [];

app.get('/',function(req,res){

});

app.get('/api/jokes',(req,res) => {
  res.send(jokes);
});

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
  });

  app.put('/api/jokes/:id',(req,res) => {
    const joke = jokes.find(c => c.id === parseInt(req.params.id));
     if (!joke) return res.status(404).send('the course coudlnt be found');
    
     const {error} = validateCourse(req.body); // result.error
     if (error) return res.status(400).send(error.details[0].message);
       
     joke.name = req.body.name;
     res.send(joke);
   });
//--------------------------------------------------------------//
// //same method different
//    app.get('/api/pickuplines',(req,res) => {
//     res.send(pickuplines);
//   });
  
//   app.get('/api/pickuplines/:id',(req,res) => {
//     const pickup = pickuplines.find(c => c.id === parseInt(req.params.id));
//     if (!pickup) return res.status(404).send('the course coudlnt be found');
//     res.send(pickup)
//   });
  
//   app.delete('/api/pickuplines/:id',(req,res) => {
//     //checks is the adress exists
//     const pickup = pickuplines.find(c => c.id === parseInt(req.params.id));
//     if (!pickup) return res.status(404).send('the course coudlnt be found');
  
//     //delete part
//     const index = pickuplines.indexOf(pickup);
//     pickuplines.splice(index,1);
  
//     //returnibg the same course
//     res.send(pickup);
  
//   });
  
  
  
  
//   app.post('/api/pickuplines',(req,res)=>{
//     const {error} = validatePickUpLine(req.body); // result.error
//     if (error) return res.status(400).send(error.details[0].message);
  
//     const pickupliner = {
//       id: pickuplines.length + 1,
//       setup: req.body.setup
//     };
  
//     pickuplines.push(pickupliner);
//     res.send(pickupliner);
//     });
  
//     app.put('/api/pickuplines/:id',(req,res) => {
  
//       const pickup = pickuplines.find(c => c.id === parseInt(req.params.id));
//        if (!pickup) return res.status(404).send('the course coudlnt be found');
      
//        const {error} = validatePickUpLine(req.body); // result.error
//        if (error) return res.status(400).send(error.details[0].message);
         
//        pickup.name = req.body.name;
//        res.send(pickup);
     
//      });
  
// //------------------------------------------------------------------------//

// app.get('/api/funnyfacts',(req,res) => {
//   res.send(funnyfacts);
// });

// app.get('/api/funnyfacts/:id',(req,res) => {
//   const funnyfact = funnyfacts.find(c => c.id === parseInt(req.params.id));
//   if (!funnyfact) return res.status(404).send('the course coudlnt be found');
//   res.send(funnyfact)
// });

// app.delete('/api/funnyfacts/:id',(req,res) => {
//   //checks is the adress exists
//   const funnyfact = funnyfacts.find(c => c.id === parseInt(req.params.id));
//   if (!funnyfact) return res.status(404).send('the course coudlnt be found');

//   //delete part
//   const index = funnyfacts.indexOf(funnyfact);
//   funnyfacts.splice(index,1);

//   //returnibg the same course
//   res.send(funnyfact);

// });

// app.post('/api/funnyfacts',(req,res)=>{
//   const {error} = validateFunnyFacts(req.body); // result.error
//   if (error) return res.status(400).send(error.details[0].message);

//   const funnyfactor = {
//     id: funnyfacts.length + 1,
//     setup: req.body.setup
//   };

//   funnyfacts.push(funnyfactor);
//   res.send(funnyfactor);
//   });

//   app.put('/api/funnyfacts/:id',(req,res) => {

//     const funnyfact = funnyfacts.find(c => c.id === parseInt(req.params.id));
//      if (!funnyfact) return res.status(404).send('the course coudlnt be found');
    
//      const {error} = validateFunnyFacts(req.body); // result.error
//      if (error) return res.status(400).send(error.details[0].message);
       
//      funnyfact.name = req.body.name;
//      res.send(funnyfact);
   
//    });


 const port = process.env.PORT || 3000;
  app.listen(port,() => console.log(`Listening on port ${port}...`));

  function validateCourse (joke){
    const schema = {
      setup: Joi.string().min(1).required(),
     punchline: Joi.string().min(1).required()
    };
    return Joi.validate(joke,schema);
  }


//   function validatePickUpLine (pickup){
//     const schema = {
//       setup: Joi.string().min(1).required(),
    
//     };
//     return Joi.validate(pickup,schema);
//   }

//   function validateFunnyFacts (funnyfact){
//     const schema = {
//       setup: Joi.string().min(1).required(),
    
//     };
//     return Joi.validate(funnyfact,schema);
//   }