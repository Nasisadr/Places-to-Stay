// configuring application 
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);




//importing myconn module which is in a seperate file
const con = require('./mysqlconn');

// use connection to create the session store. Note we have to use the connection in promise-based mode
const sessionStore = new MySQLStore({ } , con.promise());

//using dotenv
//config loads dotenv
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());
//for WAD
app.use(express.urlencoded({extended: false}));




app.use(expressSession({
    // Specify the session store to be used.
    store: sessionStore, 

    // a secret used to digitally sign session cookie, use something unguessable (e.g. random bytes as hex) in a real application.
    secret: 'BinnieAndClyde', 

    // use as recommended by your chosen session store - related to internals of how session stores work
    resave: false, 

    // save session to store before modification
    saveUninitialized: false, 

    // reset cookie for every HTTP response. The cookie expiration time will be reset, to 'maxAge' milliseconds beyond the time of the response. 
    // Thus, the session cookie will expire after 10 mins of *inactivity* (no HTTP request made and consequently no response sent) when 'rolling' is true.
    // If 'rolling' is false, the session cookie would expire after 10 minutes even if the user was interacting with the site, which would be very
    // annoying - so true is the sensible setting.
    rolling: true, 

    // destroy session (remove it from the data store) when it is set to null, deleted etc
    unset: 'destroy', 

    // useful if using a proxy to access your server, as you will probably be doing in a production environment: this allows the session cookie to pass through the proxy
    proxy: true, 

    // properties of session cookie
    cookie: { 
        maxAge: 600000, // 600000 ms = 10 mins expiry time
        httpOnly: false // allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
    }
}));




module.exports=app;