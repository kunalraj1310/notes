const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static Files
app.use(express.static(path.join(__dirname, "public")));


// View Engine
app.set("view engine", "ejs");


// Home Route
app.get("/", (req, res) => {

    fs.readdir("./files", (err, files) => {

        if (err) {
            console.log(err);
            return res.send("Error reading files");
        }

        res.render("index", { files });

    });

});


// Create Note Route
app.post("/create", (req, res) => {

    const filename =
        req.body.title.split(" ").join("") + ".txt";

    const details = req.body.details;

    fs.writeFile(`./files/${filename}`, details, (err) => {

        if (err) {
            console.log(err);
            return res.send("Error creating file");
        }

        res.redirect("/");

    });

});


// Read Note Route
app.get("/file/:filename", (req, res) => {

    const filename = req.params.filename;

    fs.readFile(`./files/${filename}`, "utf-8", (err, data) => {

        if (err) {
            console.log(err);
            return res.send("Error reading file");
        }

        res.render("read", {
            filen: filename,
            datadetails: data
        });

    });

});

// deleting note 

app.get("/delete/:filename", (req, res) => {

    const filename = req.params.filename;

    fs.unlink(`./files/${filename}`, (err) => {

        if (err) {
            console.log(err);
            return res.send("Error deleting file");
        }

        res.redirect("/");

    });

});
 
// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});