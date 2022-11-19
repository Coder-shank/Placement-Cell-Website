const express = require('express');

const app = express();

const port = 8000;
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const db = require('./config/mongoose');
const information= require('./models/Interview')
const fs = require('fs');

const session = require('express-session');

const {Parser} = require('json2csv');

app.use(express.urlencoded({extended:true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(session({
    name: "Learning",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true , maxAge: (1000*60*30)}
  }));

//to initiate / start ..authentication 
app.use(passport.initialize());
// to save req in cookies 
app.use(passport.session());

//takes user form req and saves it in res.
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));



app.listen(port, function(err){
    if (err){
        console.log(error, "Error found in running server")
    }
    console.log("Server is running on port:", port)
})