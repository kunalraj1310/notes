const mongoose = require('mongoose');
const notes = require('./notes');

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    notes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"note"
    }]
})

module.exports = mongoose.model("user",userSchema)