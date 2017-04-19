var loginController = require("../controller/login_controller");
var loggedInCheck = require("./loggedInCheck");



//var loginController = require("../controller/signupLoginController.js");
var path = require("path");


module.exports = function(app) {

app.get("/", function(req, res) {


    res.sendFile(path.join(__dirname + "/../public/login.html"));

    
});	


app.get("/signup", function(req, res) {

    res.sendFile(path.join(__dirname + "/../public/signup.html"));

    loggedInCheck.alreadyLogIn(req, res);
});	
app.get("/login", function(req, res) {

    res.sendFile(path.join(__dirname + "/../public/login.html"));

    loggedInCheck.alreadyLogIn(req, res);
});	


app.post("/loggedIn", loginController.loggedIn);




app.get("/echoes", loggedInCheck.requireLogin, loginController.echoes);
app.get("/errorPage", loggedInCheck.requireLogin, function(req, res){
	var obj ={
		//currentUser : req.session.user.firstName
	}
    res.render("errorPage", obj);
})

}