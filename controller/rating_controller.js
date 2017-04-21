var request = require('request');
var rp = require("request-promise");

var session = require('express-session');



var rating = {

troll: function(req, res){
req.session.reset();
console.log("signed out!")
  res.redirect('/');
},

like: function(req, res){
req.session.reset();
console.log("signed out!")
  res.redirect('/');
}


}

module.exports = rating;
