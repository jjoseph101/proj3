var request = require('request');
var rp = require("request-promise");

var session = require('express-session');

var signupLogin = {
    signUp: function (req, res) {
        console.log(req.body);
        var userProfile = {
            userName: req.body.userName,
            password: req.body.password,
            screenName: req.body.screenName,
            email: req.body.email,
            phone: req.body.phone,
            postalCode: req.body.postalCode,
            country: req.body.country,
            interests: req.body.interests
        }
        console.log("UP: ");
        console.log(userProfile);
        var options = {
            method: 'POST',
            uri: 'http://echoingwallapiservice.azurewebsites.net/signup',
            body: userProfile,
            json: true // Automatically stringifies the body to JSON
        };

        rp(options).then(function (response) {

            console.log(response);
            // POST succeeded...
            if (response.status == 200) {
                console.log("inside signup200");

                res.send('/login');

            } else {
                res.send({error: response.message});
                }

            })
            .catch(function (err) {
                // POST failed...
                res.json({error: response.message});
            });

    },

    loggedIn: function (req, res) {

        var userProfile = {
            userName: req.body.userName,
            password: req.body.password
        }

        var options = {
            method: 'POST',
            uri: 'http://echoingwallapiservice.azurewebsites.net/login',
            body: userProfile,
            json: true // Automatically stringifies the body to JSON
        };

        rp(options).then(function (response) {

            // console.log(response); POST succeeded...
            if (response.status == 200) {

                console.log(200);
                var currentUser = response.data;
                // console.log(currentUser);
                req.session.user = currentUser;
                //  req.session.user.interest = resonse.data[0][1];

                res.locals.user = currentUser;
                res.send('/echoes');

            } else {
                console.log(500);
                res.send({error: response.message});
            }

            // thinking of posting all interest to cookie; pass it in to all the things
            // tryhref ?id={{categoryID}}

        })
            .catch(function (err) {
                res.json({error: response.message});
            });

    },

    echoes: function (req, res) {
        console.log("inside ectoes");
        // console.log(req.session.user);

        var obj = {
            userProfile: req.session.user[0],
            userInterest: req.session.user[1],
            userRating: req.session.user[2],
            userEchoes: req.session.user[3]
        }
        if (req.session.user[3].length > 0) {

            res.render("echoes", obj);

        } else {
            res.render("noTopic", obj);
        }
    }

}

module.exports = signupLogin;

/*

[ [ { userID: 2,
      userName: 'atrader100@gmail.com',
      screenName: 'atrader',
      email: 'atrader100@gmail.com',
      phone: '832-111-5555',
      postalCode: '77478',
      country: 'USA',
      accountStatus: true } ],
  [ { categoryID: 5, categoryName: 'Advice' },
    { categoryID: 2, categoryName: 'News' },
    { categoryID: 3, categoryName: 'Music' },
    { categoryID: 4, categoryName: 'Entertainment' },
    { categoryID: 5, categoryName: 'Advice' } ],
  [ { TrollCount: 0, LikeCount: 4 } ],
  [ { TopicID: 4,
      senderID: 2,
      topicName: 'UUU',
      topicDescription: 'something else',
      topicCity: 'Sugar LAnd',
      topicState: 'TX',
      topicPostalCode: '77478',
      topicCountry: 'USA',
      createdAt: '2017-04-12T20:32:08.763',
      chatUpdatedAt: '2017-04-17T23:44:43.757' },
    { TopicID: 2,
      senderID: 2,
      topicName: 'Tooop',
      topicDescription: 'Trump on Mexico',
      topicCity: 'Sugar Land',
      topicState: 'TX',
      topicPostalCode: '77478',
      topicCountry: 'usa',
      createdAt: '2017-04-12T20:30:23.473',
      chatUpdatedAt: '2017-04-17T23:44:24.553' },
     { TopicID: 3,
      senderID: 2,
      topicName: 'TU',
      topicDescription: 'somethong 3',
      topicCity: 'Sugar Land',
      topicState: 'TX',
      topicPostalCode: '77478',
      topicCountry: 'USA',
      createdAt: '2017-04-12T20:31:28.113',
      chatUpdatedAt: '2017-04-16T21:20:01.513' },
    { TopicID: 1,
      senderID: 2,
      topicName: 'TRUMP',
      topicDescription: 'Trump on Syria',
      topicCity: 'Sugar Land',
      topicState: 'TX',
      topicPostalCode: '77478',
      topicCountry: 'USA',
      createdAt: '2017-04-12T19:10:57.137',
      chatUpdatedAt: '2017-04-12T19:10:57.137' } ] ]
*/