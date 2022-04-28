const mongoose = require('mongoose');

const CookieSchema = new mongoose.Schema({
    image:{
        data: Buffer,
        contentType: String
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
    tags:{
        type:String
    }
});

module.exports = mongoose.model('Cookie', CookieSchema );

