var topicController = require("../controller/topic_controller");
var loggedInCheck = require("./loggedInCheck");



//var loginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {



app.post("/topicbycategory/:id", topicController.topicByCategory);
//app.get("/topicbycategory/:id", topicController.topicByCategory);



}