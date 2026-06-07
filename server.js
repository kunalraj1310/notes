require('dotenv').config();
const express = require("express");
const path = require("path");
const notesSchema = require("./models/notes");
const userSchema = require("./models/user");
const { title } = require("process");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();


// ==================== Middleware ====================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ==================== Static Files ====================

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));


// ==================== View Engine ====================

app.set("view engine", "ejs");


// ==================== Home Routes ====================

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/register",directLogin, (req, res) => {
    res.render("register");
});

app.get("/login",directLogin, (req, res) => {
    res.render("login");
});


// ==================== Register ====================

app.post("/register", async (req, res) => {

    const alreadyUser = await userSchema.findOne({
        email: req.body.email
    });

    if (alreadyUser) {

        res.send("user already registerd");

    } else {

        const hash = await bcrypt.hash(req.body.password, 10);

        await userSchema.create({
            email: req.body.email,
            username: req.body.username,
            password: hash
        });

        const token = jwt.sign(
            { email: req.body.email },
            process.env.JWT_SEC
        );

        res.cookie("token", token);
        res.redirect("/createnotes");
    }
});


// ==================== Direct Login ====================
function directLogin (req,res,next){
    const token = req.cookies.token;

    if (!token) {
        return next();
    }

    try {

        const result = jwt.verify(token, process.env.JWT_SEC);
        return res.redirect("/createnotes")
    } catch (err) {
        return next();
    }
}
// ==================== Login ====================
app.post("/login", async (req, res) => {
    
    const user = await userSchema.findOne({
        email: req.body.email
    });

    if (user) {

        const verifypass = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (verifypass) {

            const token = jwt.sign(
                { email: req.body.email },
                process.env.JWT_SEC
            );

            res.cookie("token", token);
            res.redirect("/createnotes");

        } else {

            res.send("something went wrong");
        }

    } else {

        res.send("something went wrong");
    }
});


// ==================== Logout ====================

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});


// ==================== Auth Middleware ====================

function isLoggedIn(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {

        const result = jwt.verify(token, process.env.JWT_SEC);
        req.user = result;
        next();

    } catch (err) {

        return res.redirect("/login");
    }
}

// =============== Authorisation of Note Owner ===========
async function NoteOwner (req,res,next){
    const user = await userSchema.findOne({email:req.user.email})
    const id = req.params.id
    const result = user.notes.includes(id)
    if(result){
        next()
    }else{
        res.send("you are not authorised for this ")
    }
}

// ==================== Notes Dashboard ====================

app.get("/createnotes", isLoggedIn, async (req, res) => {

    const user = await userSchema
        .findOne({ email: req.user.email })
        .populate("notes");

    res.render("index", { user });
});


// ==================== Create Note ====================

app.post("/create", isLoggedIn, async (req, res) => {

    const users = await userSchema.findOne({
        email: req.user.email
    });

    const newPost = await notesSchema.create({
        title: req.body.title,
        note: req.body.note,
        user: users._id
    });

    users.notes.push(newPost._id);

    await users.save();

    res.redirect("/createnotes");
});


// ==================== Read Note ====================

app.get("/file/:id",isLoggedIn, NoteOwner,  async (req, res) => {

    const filename = req.params.id;

    const usernote = await notesSchema.findOne({
        _id: filename
    });

    res.render("read", { usernote });
});


// ==================== Delete Note ====================

app.get("/delete/:id", isLoggedIn,NoteOwner, async (req, res) => {

    const user = await userSchema.findOne({
        email: req.user.email
    });

    const filename = req.params.id;

    const note = await notesSchema.findOneAndDelete({
        _id: filename
    });

    user.notes.pull(filename);

    await user.save();

    res.redirect("/createnotes");
});


// ==================== Edit Note ====================

app.get("/edit/:id", isLoggedIn,NoteOwner,async (req, res) => {

    const edit = await notesSchema.findOne({
        _id: req.params.id
    });

    res.render("edit", { edit: edit });
});


// ==================== Update Note ====================

app.post("/update/:id", isLoggedIn,NoteOwner,async (req, res) => {

    await notesSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
            title: req.body.editedtitle,
            note: req.body.editednote
        }
    );

    res.redirect(`/file/${req.params.id}`);
});

// ==================== Export ====================


module.exports = app;