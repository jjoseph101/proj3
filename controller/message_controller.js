
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
console.log(req.body);

console.log("this is the new client id for chatroom from after we click join");
console.log(req.session.user[0][0].ConnectionID);

console.log("this is the old from popular client id from before we click join");
console.log(req.body.connectionID);

var topicId = req.body.topicID;



var chat = {topicID : topicId,
    connectionID: req.session.user[0][0].ConnectionID  //the cookie or the one from previous page... THEY ARE DIFFERENT

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
                            clientID: req.session.user[0][0].ConnectionID
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
  clientID: req.session.user[0][0].ConnectionID 
}
var subScribe = {
    topicID :req.body.topicID,
    connectionID: req.session.user[0][0].ConnectionID 
}
console.log(chat);
var subscribe = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/get/topic/subscribetotopic',
    body: subScribe,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(subscribe);
            


var options = {
    method: 'POST',
    uri: 'http://echoingwallapiservice.azurewebsites.net/save/chat',
    body: chat,
    json: true // Automatically stringifies the body to JSON 
};
 
        rp(options);
    //         .then(function (response) {

    //                console.log(response);
    //             // POST succeeded... 
    //                   if(response.status == 200){

                    

    //                     console.log(200);
    //                     // console.log(response.data[0]);
                        
    //                     // var obj = {
    //                     //       userProfile : req.session.user[0],
    //                     //     userInterest : req.session.user[1],
    //                     //     userRating: req.session.user[2],
    //                     //     messages: response.data[0],
    //                     //     topicID: req.body.topicID,
    //                     //     clientID: req.body.clientID
    //                     // }
                       
    //                     //     res.render("chatRoom", obj);
    //                  res.json({"status": "ok"});
                     
    //                  }else{
    //                      console.log(500);
    //                      res.json({ error: response.message });
    //                  }


    // })
    // .catch(function (err) {
    //     res.json({ error: err.message });
    // });


}










}


module.exports = chat;