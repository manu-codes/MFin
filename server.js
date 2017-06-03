	// server.js

//=================================================
const express = require('express')
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');

const DATA_PATH = 'data/';
const DB_NAME = 'mfin';
const port = process.env.PORT || 8080; 
// configuration ===========================================
const app = express();
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require("./app/routes/web")(app); // configure our routes
require("./app/routes/crud")(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
