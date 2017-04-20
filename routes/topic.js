var topicController = require("../controller/topic_controller");
var loggedInCheck = require("./loggedInCheck");



//var loginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {



app.post("/topicbycategory/:id", loggedInCheck.requireLogin, topicController.topicByCategory);
app.get("/topicbypopularity", loggedInCheck.requireLogin, topicController.topicByPopularity);
app.get("/createEchoes", loggedInCheck.requireLogin, topicController.getAllCategory);
app.post("/createEchoes", loggedInCheck.requireLogin, topicController.createTopic);


}