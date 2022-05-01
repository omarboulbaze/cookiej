// Dotenv
require('dotenv').config({path:'./../.env'});


// Express.js
const express = require('express');
const app = express();
// Parsing to json type
app.use(express.json())
// Avoiding cross origin security problems
const cors = require('cors');
app.use(cors());

// Establishing a database connection
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => {
    console.error(err);
  });

// Importing the exported models
const Cookie = require('./models/cookie');

// Adding a cookie to the database.
app.post('/api/addCookie',(req, res)=>
    {
    console.log(req.body);

    const cookie = new Cookie(req.body);
    
    cookie.save( (err,data)=> 
        {
        if(err) return res.status(500).json(err);           
        res.status(201).json(data);
            }
        );
    }
);



// Returning all reviews that exists in the database.
app.get('/api/', (req,res)=>
            {
            Cookie.find({}, (err, data) =>{
              if(err) {
                console.log(err);
                res.status(500).send();
              } else {
              res.status(200).json(data);
              }
            })
            
            }
        );

const PORT = process.env.PORT || 8801;
app.listen(PORT, ()=>{
   console.log(`Server started on ${PORT}...`)
})