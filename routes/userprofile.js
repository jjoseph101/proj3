var userProfileController = require("../controller/userprofile_controller");
var loggedInCheck = require("./loggedInCheck");


//var loginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {


app.get("/updateNav", userProfileController.getNavOption);

app.post("/updateNav", userProfileController.postNavOption);





}