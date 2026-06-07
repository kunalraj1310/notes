require('dotenv').config();
const mongoose = require('mongoose');
const user = require('./user');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const notesSchema = new mongoose.Schema({
  title: String,
  note: String,
  user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"note"
      }
});

module.exports = mongoose.model("note", notesSchema);