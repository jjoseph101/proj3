var messageController = require("../controller/message_controller");
var loggedInCheck = require("./loggedInCheck");


//var loginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {


app.post("/startChat", loggedInCheck.requireLogin, messageController.startChat);

app.post("/sendChat", loggedInCheck.requireLogin, messageController.sendChat);

app.post("/setConnectionID", messageController.setConnection);




}