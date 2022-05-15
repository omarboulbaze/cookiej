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

// #endregion Imports

// Multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null,'images/')
  },
  filename: (req, file, cb)=>{
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage: storage});

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
app.post('/api/addCookie', upload.single('image'),(req, res)=> {

    console.log(req.file);
    console.log(req.body);

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
            }
        );
    }
);



// Returning all reviews that exists in the database.
app.get('/api/', (req,res)=> {
  Cookie.find({}, (err, data) =>{
  if(err) {
    console.log(err);
    res.status(500).send();
    } else {
        res.status(200).json(data);
}})

}
);

// Get image
app.get('/api/images/:fileName', (req, res) => {
  const filePath = `${__dirname}/images/${req.params.fileName}`
  res.sendFile(filePath)
});

// Deleting a cookie by ID
app.delete('/api/delete/:id', (req, res) => {

  Cookie.findOneAndDelete({_id: req.params.id}).exec((err, cookie) => {
      if(err) return res.status(500).json({code: 500, message: 'There was an error deleting the cookie', error: err})
      res.status(200).json({code: 200, message: 'Cookie deleted', deletedCookie: cookie})
    });
  
});

// Setting up the API on the port
const PORT = process.env.PORT || 8801;
app.listen(PORT, ()=>{
   console.log(`Server started on ${PORT}...`)
})