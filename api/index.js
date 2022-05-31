// #region Imports

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

// Core node module
const path = require('path');

// File system
const fs = require('fs');

// #endregion Imports

// #region Multer
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{ cb(null,'images/') },
    filename: (req, file, cb)=>{ cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));}
});
const upload = multer({storage: storage});
// #endregion

// Establishing a database connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
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
app.post('/api/addCookie', upload.single('image'),(req, res)=> {

    // console.log(req.file);

    const cookie = new Cookie({
        _id: new mongoose.Types.ObjectId(),
        image: req.file ? req.file.filename : null,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        rank: req.body.rank,
        tag: req.body.tag
      });
    
    cookie.save( (err,data)=> {
              if(err) return res.status(500).json(err);           
              res.status(201).json(data);
              // console.log(data);
            }
        );
    }
);

// Deleting a cookie by ID
app.delete('/api/delete/:id', (req, res) => {

  Cookie.findOneAndDelete({_id: req.params.id}).exec((err, cookie) => {
      if(err) return res.status(500).json({code: 500, message: 'There was an error deleting the cookie', error: err})
      res.status(200).json({code: 200, message: 'Cookie deleted', deletedCookie: cookie})
      const deleteImage = `./images/${cookie.image}`
      if (fs.existsSync(deleteImage)) {
        fs.unlink(deleteImage, (err) => { if (err) console.log(err) })
      }
    });
  
});

// Update a cookie by ID
app.put('/api/update/:id', upload.single('image'), (req,res) => {

  Cookie.findOneAndUpdate({_id:req.params.id},
    {$set:{
      image: req.file ? req.file.filename : (req.body.image ? req.body.image : null),
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      date: req.body.date,
      rank: req.body.rank
    }},
    (err, cookie)=>{
      if(err) return res.status(500).json({code: 404, message: 'There was an error updating the cookie', error: err})
      res.status(200).json({code: 200, message: 'Cookie updated'})
      // If the user uploads an image with the request, update it and delete the old image associated with the cookie 
      // OR if the cookie image is null, check if the cookie image had an image and delete it. (Optimizing storage)
      if(req.file || !req.body.image){ 
        const deleteImage = `./images/${cookie.image}`
        if (fs.existsSync(deleteImage)) {
          fs.unlink(deleteImage, (err) => { if (err) console.log(err) })
        }
      }
      
    })
});


// Returning all reviews that exists in the database.
app.get('/api/', (req,res)=> {
  Cookie.find({}, (err, data) =>{
  if(err) {
    console.log(err);
    res.status(500).send();
    } else {
        res.status(200).json(data);
  }})

});

// Get image
app.get('/api/images/:fileName', (req, res) => {
  const filePath = `${__dirname}/images/${req.params.fileName}`
  res.sendFile(filePath)
});



// Setting up the API on the port
const PORT = process.env.PORT || 8801;
app.listen(PORT, ()=>{
   console.log(`Server started on ${PORT}...`)
})