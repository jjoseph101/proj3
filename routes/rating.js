var ratingController = require("../controller/rating_controller");
var loggedInCheck = require("./loggedInCheck");



module.exports = function(app) {



app.post("/like",loggedInCheck.requireLogin, ratingController.like);
app.post("/troll", loggedInCheck.requireLogin, ratingController.troll);

}