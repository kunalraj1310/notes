const express = require("express");
const path = require("path");
const notesSchema = require("./models/notes");
const { title } = require("process");

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

// View Engine
app.set("view engine", "ejs");


// Home Route
app.get("/", async (req, res) => {

    const notes = await notesSchema.find()

        res.render("index", {notes});

    });




// Create Note Route
app.post("/create", async (req, res) => {
    await notesSchema.create({
        title: req.body.title,
        note: req.body.note
    })

        res.redirect("/");

});




// Read Note Route
app.get("/file/:filename", async (req, res) => {

    const filename = req.params.filename;
    const usernote = await notesSchema.findOne({_id :filename})
    
        res.render("read",{usernote});
    });
// deleting note 

app.get("/delete/:filename", async (req, res) => {

    const filename = req.params.filename;
    await notesSchema.findOneAndDelete({_id :filename})
     res.redirect('/')
});

//editing note 

app.get("/edit/:edit", async (req,res)=>{
    const edit = await notesSchema.findOne({_id:req.params.edit})
    res.render("edit",{edit:edit})
})
 //update note 
 app.post("/update/:update" , async (req,res)=>{
    await notesSchema.findOneAndUpdate({_id:req.params.update}, {
        title:req.body.editedtitle,
        note: req.body.editednote
    })
    res.redirect(`/file/${req.params.id}`);
 })
// Server
module.exports = app;