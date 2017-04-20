var userProfileController = require("../controller/userprofile_controller");
var loggedInCheck = require("./loggedInCheck");


//var loginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {


app.get("/updateNav", loggedInCheck.requireLogin, userProfileController.getNavOption);

app.post("/updateNav", loggedInCheck.requireLogin, userProfileController.postNavOption);

app.get("/logout", userProfileController.signout);



}