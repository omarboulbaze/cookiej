const mongoose = require('mongoose');

const CookieSchema = new mongoose.Schema({
    image:{
       type:String
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        required:true
    },
    rank:{
        type:String,
        required:true
    },
    tag:{
        type:String
    }
});

module.exports = mongoose.model('Cookie', CookieSchema );

