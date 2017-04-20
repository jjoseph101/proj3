var searchController = require("../controller/searchtopic_controller");
var loggedInCheck = require("./loggedInCheck");



//var loginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {



app.post("/searchEchoes",loggedInCheck.requireLogin, searchController.topicSearch);
app.get("/searchEchoes", loggedInCheck.requireLogin, searchController.search);


}