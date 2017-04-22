var request = require('request');
var rp = require("request-promise");

var session = require('express-session');



var rating = {

troll: function(req, res){
	console.log("Inside of Troll");
	console.log(req.body)
var trollPost = {
  receiverUserID: req.body.senderUserID,
  senderUserID: req.session.user[0][0].userID,
  troll: true
}

var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/save/rating',
    body: trollPost,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options)
            .then(function (response) {
              
                // POST succeeded... 
                      if(response.status == 200){

                        console.log(200+" inside Like");

                        
                       res.redirect("/startChat1") 
                    
                     }else{
                         console.log(500);
                          res.redirect("/errorPage");
                     }
    })
    .catch(function (err) {
          res.redirect("/errorPage");
    });


},

like: function(req, res){
	console.log("Inside of Like")
	console.log(req.body)


var likePost = {
  receiverUserID: req.body.senderUserID,
  senderUserID: req.session.user[0][0].userID,
  troll: false
}




var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/save/rating',
    body: likePost,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options)
            .then(function (response) {
              
                // POST succeeded... 
                      if(response.status == 200){

                        console.log(200+" inside Like");
                        
                       res.redirect("/startChat1") 
                    
                     }else{
                         console.log(500);
                          res.redirect("/errorPage");
                     }
    })
    .catch(function (err) {
          res.redirect("/errorPage");
    });



}





















}

module.exports = rating;
