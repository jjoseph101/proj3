var request = require('request');
var rp = require("request-promise");

var session = require('express-session');



var topic = {
search: function(req, res){
var option ={
    method: 'GET',
    uri: 'http://echoingwallapiservice.azurewebsites.net/get/all/categories',

    json: true // Automatically stringifies the body to JSON 

}
rp(option)
    .then(function (allCategory) {
        if(allCategory.status == 200){

                       console.log(200 + "for interest");
                          
                          var obj = {
                               userProfile : req.session.user[0],
                            userInterest : req.session.user[1],
                            userRating: req.session.user[2],
                            allCategory : allCategory.data[0]
                          

                          }
                         
                        // console.log(obj);
                         
                         res.render('search', obj);
                        
                 
                     
                     }else{
                        // console.log(500 + "for interest");
                         res.json({ error: response.message });
                     }

 })
    .catch(function (err) {
            res.json({ error: err.message });
});




},
topicSearch : function(req, res){

    console.log("inside search");
    console.log(req.body);

var search = {
  categoryID: req.body.categoryID,
  searchBy: req.body.searchBy,
  topicCity: req.body.topicCity,
  topicState: req.body.topicState,
  topicPostalCode: req.body.topicPostalCode,
  topicCountry: req.body.topicCountry
}



var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/topic/search',
    body: search,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options)
            .then(function (response) {

                   // console.log(response);
                // POST succeeded... 
                      if(response.status == 200){

                    

                        console.log(200);
                         console.log(response.data[0]);
                        
                        var obj = {
                              userProfile : req.session.user[0],
                            userInterest : req.session.user[1],
                            userRating: req.session.user[2],
                            topics : response.data[0]
                        }
                        if (response.data[0].length > 0){
                        res.render("topicBySearch", obj);
                        }else{
                            res.render("noTopic", obj);
                        }
                     
                     }else{
                         console.log(500);
                         res.json({ error: response.message });
                     }


    })
    .catch(function (err) {
        res.json({ error: err.message });
    });





}
}
module.exports = topic;