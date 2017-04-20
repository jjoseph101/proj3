
var request = require('request');
var rp = require("request-promise");

var session = require('express-session');



var chat = {
setConnection: function(req, res){
console.log("inside set Conneection");
console.log(req.body);
var connectionID = req.body.ConnectionID;

//{ConnectionID : connection.id}
req.session.user[0][0].ConnectionID = connectionID;

console.log("cookie");
//console.log(req.session.user);
res.json({ status: 'ok' });

},

startChat : function(req, res){
console.log("inside start chat");

console.log(req.session.user[0][0].ConnectionID);
var topicId = req.body.topicID;


var connectionId = "1234577"
var chat = {topicID : topicId,
    connectionID: connectionId  //the cookie or the one from previous page... THEY ARE DIFFERENT

}
console.log("this is topic id inside start chat");
console.log(topicId);

var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/get/topic/chathistory',
    body: chat,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options)
            .then(function (response) {

                  // console.log(response);
                // POST succeeded... 
                      if(response.status == 200){

                    

                        console.log(200);
                        // console.log(response.data[0]);
                        
                        var obj = {
                              userProfile : req.session.user[0],
                            userInterest : req.session.user[1],
                            userRating: req.session.user[2],
                            messages: response.data[0],
                            topicID: topicId,
                            clientID: connectionId
                        }
                       
                            res.render("chatRoom", obj);
                     
                     
                     }else{
                         console.log(500);
                         res.json({ error: response.message });
                     }


    })
    .catch(function (err) {
        res.json({ error: err.message });
    });


},
sendChat: function(req, res){

    var chat = {
  message: req.body.message,
  senderID: req.session.user[0][0].userID,
  messageTopicID: req.body.topicID,
  screenName:  req.session.user[0][0].screenName,
  clientID: req.body.clientID
}

var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/save/chat',
    body: chat,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options)
            .then(function (response) {

                   console.log(response);
                // POST succeeded... 
                      if(response.status == 200){

                    

                        console.log(200);
                         console.log(response.data[0]);
                        
                        // var obj = {
                        //       userProfile : req.session.user[0],
                        //     userInterest : req.session.user[1],
                        //     userRating: req.session.user[2],
                        //     messages: response.data[0],
                        //     topicID: req.body.topicID,
                        //     clientID: req.body.clientID
                        // }
                       
                        //     res.render("chatRoom", obj);
                     
                     
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


module.exports = chat;