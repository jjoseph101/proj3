var request = require('request');
var rp = require("request-promise");

var session = require('express-session');



var topic = {

getAllCategory: function(req, res){

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
                         if(allCategory.data[0].length >0){
                                res.render('createTopic', obj);
                         }else{
                             res.redirect("/errorPage");

                         }
                 
                     }else{
                        // console.log(500 + "for interest");
                           res.redirect("/errorPage");
                     }

 })
    .catch(function (err) {
         res.redirect("/errorPage");
});

    


},

createTopic: function(req, res){

console.log("inside post create");
console.log(req.body);
var topic = {
    topicName : req.body.topicName,
    topicDescription : req.body.topicDescription,
    city: req.body.topicCity,
    state: req.body.topicState,
    postalCode: req.body.topicPostalCode,
    country: req.body.topicCountry,
    creatorUserID: req.session.user[0][0].userID,
    categoryID: req.body.categoryID

}
var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/create/topic',
    body: topic,
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
                            userEchoes: req. session.user[3]

                        }
                        if( req. session.user[3].length >0){
                         res.render("echoes", obj );
                         //res.render("echoes", obj);
                        }else{

                            res.render('noTopic', obj);
                        }
                   }else{
                        res.redirect("/errorPage")
                     }

                    })
                    .catch(function (err) {
                          res.redirect("/errorPage")
                    });



},
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
             
                    console.log(response);
                // POST succeeded... 
                      if(response.status == 200){
                        console.log(200);
                        var obj = {
                            userProfile : req.session.user[0],
                            userInterest : req.session.user[1],
                            userRating: req.session.user[2],
                            topics: response.data[0]

                        }
                        console.log("topic")
                        console.log(response.data[0]);
                            if (response.data.length > 0){
                                console.log("if >")
                                res.render("topicByCategory", obj);
                        }else{
                            console.log("else")
                                 res.render("noTopic", obj);
                        }
                      //res.render("topicByCategory", obj );
                         //res.render("echoes", obj);

                   }else{
                         console.log(500);
                          res.redirect("/errorPage")
                     }









    })
    .catch(function (err) {
         console.log("catch")
         console.log(err.message)
      res.redirect("/errorPage")
    });





},
topicByPopularity : function(req, res){
 
    
 
var options = {
    method: 'GET',
    uri: 'http://echoingwallapiservice.azurewebsites.net/get/popularTopics',
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options)
            .then(function (response) {
                     
                        
                // POST succeeded... 
                      if(response.status == 200){
                        console.log("popular");
                      
                       
                          console.log(response.data[0]);

                        var obj = {
                            userProfile : req.session.user[0],
                            userInterest : req.session.user[1],
                            userRating: req.session.user[2],
                            topics: response.data[0]     
                        }
                        
                      
                         //res.render("echoes", obj);
                        if (response.data.length > 0){
                                res.render("topicByPopularity", obj );
                        }else{
                                 res.render("noTopic", obj);
                        }
                      //res.render("topicByCategory", obj );
                         //res.render("echoes", obj);

                   }else{
                         console.log(500);
                          res.redirect("/errorPage")
                     }









    })
    .catch(function (err) {
         res.redirect("/errorPage")
    });





}











}

module.exports=topic;