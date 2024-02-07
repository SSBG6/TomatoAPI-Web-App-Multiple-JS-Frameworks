const express = require('express');
const session = require('express-session');
const axios = require('axios');
const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000
var path = require("path");

const UserModel = require("./models/user");
const ScoreModel = require("./models/score");
const mongoURI = "mongodb://localhost:27017/sessions";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//connect mongoose
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then(( res)=>{
        console.log("DB Connected");
    });
//storing session
const store = new MongoDBSession({
    uri: mongoURI,
    collection: "mySessions",
});

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
//session handling
app.use(session({
    secret:'cookie',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 30*60*1000, // Set the session to expire after 30 mins (in milliseconds)
    }
}))

//Authentification 
const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }else {
        res.redirect('/login');
    }
}

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/login",(req,res)=>{
    res.render("login");
});
const log = require('../Full_GAME/controllers/login');
//login; verification, and redirects
app.post('/login',log.post);
//signup render
app.get("/signup",(req,res)=>{
    res.render("signup");
});
//signup
const sign = require('../Full_GAME/controllers/signup');
app.post('/signup',sign.post);

//saving score
const scorer = require('../Full_GAME/controllers/savescore');
app.post('/savescore',scorer.post);

//edit profile
app.get("/profile", (req, res) => {
const username = req.session.username;
    res.render('profile',);
});
app.post("/profile", isAuth, async (req, res) => {
    const loggedInUser = await UserModel.findOne({ username: req.session.username });

if (!loggedInUser) {
    res.redirect('/login');
} else {
   
    res.render('profile', { user: loggedInUser });
}
});
//profile update
const prof = require('../Full_GAME/controllers/profile');
app.post('/update-profile',prof.post);

//logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    })
});

//Auth is sent here so that the game can only be accessed via logging in 
app.get("/game", isAuth,(req,res) => {
    const username = req.session.username;
    res.render("game", { username: username });
});
//leaderboard
const lead = require('../Full_GAME/controllers/leaderboard');
app.get('/leaderboard',lead.get);

//leaderboard
const pelead = require('../Full_GAME/controllers/personalboard');
app.get('/plead',pelead.get);
//adding css
app.use(express.static(path.join(__dirname,'public')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
