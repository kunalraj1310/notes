require('dotenv').config();
const mongoose = require('mongoose');

const mongoString = process.env.MONGO_URI;

mongoose.connect(mongoString)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Note", notesSchema);