var request = require('request');
var rp = require("request-promise");

var session = require('express-session');



var topic = {
topicByCategory : function(req, res){
    console.log("inside topicbyCategory")
 var category = {
     categoryID: req.params.id
    }
     
var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/get/topic/by/category',
    body: category,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options)
            .then(function (response) {

                    //console.log(response);
                // POST succeeded... 
                      if(response.status == 200){

                        var obj = {
                            userProfile : req.session.user[0],
                            userInterest : req.session.user[1],
                            userRating: req.session.user[2],
                            topics: response.data[0]


                        }
                         res.render("topicByCategory", obj );
                         //res.render("echoes", obj);

                   }else{
                         console.log(500);
                         res.json({ error: response.message });
                     }









    })
    .catch(function (err) {
        res.json({ error: response.message });
    });





}
}

module.exports=topic;