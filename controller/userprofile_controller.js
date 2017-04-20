var request = require('request');
var rp = require("request-promise");

var session = require('express-session');



var userProfile = {



getUserCategory: function(){



},

getNavOption: function(req, res){
console.log("get nav");
 var userProfile = {
       userID: req.session.user[0][0].userID
        
    }
console.log(userProfile);
var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/get/interest/category',
    body: userProfile,
    json: true // Automatically stringifies the body to JSON 
};

var option2 ={
    method: 'GET',
    uri: 'http://echoingwallapiservice.azurewebsites.net/get/all/categories',

    json: true // Automatically stringifies the body to JSON 

}
var allTheCategory;


rp(option2)
    .then(function (allCategory) {
        //console.log(allCategory.data);
        // Process html... 

        // if(allCategory.status == 200){



       var allTheCategory = allCategory.data[0];

        rp(options)
            .then(function (response) {

                   // console.log(response);
                // POST succeeded... 
                      if(response.status == 200){

                       // console.log(200 + "for interest");
                          
                          var obj = {

                            allCategory : allTheCategory,
                            userInterest: response.data[0]

                          }
                         
                        // console.log(obj);
                         
                         res.render('updateNav', obj);
                        
                 
                     
                     }else{
                        // console.log(500 + "for interest");
                         res.json({ error: response.message });
                     }

                     })
                    .catch(function (err) {
                        res.json({ error: err.message });
                    });

        // }else{

        //      console.log(500 + "for iall");
        //                  res.json({ error: allCategory.message });
        // }



    })
    .catch(function (err) {
                        res.json({ error: err.message });
                    });

 


},

postNavOption: function(req, res){
console.log("inside post nav");
var category = {
        userID: req.session.user[0][0].userID,
        oldCategoryID : req.body.oldCategoryID,
        newCategoryID : req.body.newCategoryID,
        
    }
 var userProfile = {
       userID: req.session.user[0][0].userID
        
    }
console.log(userProfile);
var option2 = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/get/interest/category',
    body: userProfile,
    json: true // Automatically stringifies the body to JSON 
};


var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/update/userinterest',
    body: category,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options)
            .then(function (data) {

                   console.log(data);
                // POST succeeded... 
                      if(data.status == 200){
                            console.log("post successful");
                rp(option2)
                    .then(function (response) {

                        // console.log(response);
                        // POST succeeded... 
                            if(response.status == 200){
                                     console.log("get interest2 successful");
                                req.session.user[1] =response.data[0];
                        
                                
                                var obj = {
        userProfile : req.session.user[0],
        userInterest : req.session.user[1],
        userRating: req.session.user[2],
        userEchoes: req. session.user[3]
    }
                                
                                console.log("before echoes");
                                
                                res.render('echoes', obj);
                                
                        
                            
                            }else{
                                // console.log(500 + "for interest");
                                res.json({ error: response.message });
                            }

                            })
                            .catch(function (err) {
                                res.json({ error: err.message });
                            });

                            
                                
                        
                            
                            }else{
                                console.log(500);
                                res.json({ error: data.message });
                            }




//thinking of posting all interest to cookie;
//pass it in to all the things

//tryhref ?id={{categoryID}}




    })
    .catch(function (err) {
        res.json({ error: err.message });
    });






}







}


module.exports = userProfile;