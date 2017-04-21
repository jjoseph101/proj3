// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

var methodOverride = require("method-override");
var session = require('client-sessions');
var exphbs = require("express-handlebars");


// =============================================================

//initializing the node application 
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Making all the files in the public folder available for online deployment
app.use(express.static("public"));

// Allows the app to use PUT and DELETE methods
app.use(methodOverride("_method"));

// sets up handlebars to deploy HTML pages
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express App
app.set('trust proxy', "1") ;
// Session npm is used to track cookies

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to80995879',
  duration: 60 * 60 * 1000,
  activeDuration: 30 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));


// =============================================================
//require("./routes/category.js")(app);
require("./routes/login.js")(app);
require("./routes/message.js")(app);
require("./routes/rating.js")(app);
require("./routes/searchtopic.js")(app);
require("./routes/topic.js")(app);
require("./routes/userprofile.js")(app);






  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


