var request = require('request');
var rp = require("request-promise");

var session = require('express-session');



var signupLogin = {
signUp : function(req, res){
 
 var userProfile = {
        userName : req.body.email,
        password : req.body.password,
        screenName : req.body.screenName,
        email: req.body.email,
        phone: req.body.phone,
        postalCode: req.body.postalCode,
        country: req.body.country,
        interest: req.body.interest
    }
var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/login',
    body: userProfile,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options)
            .then(function (response) {

                    console.log(response);
                // POST succeeded... 
                      if(response.status == 200){

                         res.send('/login');
                     } else {
                        res.send({ error: response.message });
                     }
    })
    .catch(function (err) {
        // POST failed... 
        res.json({ error: response.message });
    });

},
}

module.exports=signupLogin;

