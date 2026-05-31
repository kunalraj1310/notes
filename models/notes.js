const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notesapp')

const notesSchema = mongoose.Schema({
    title: String,
    note : String
})

module.exports = mongoose.model("note", notesSchema)