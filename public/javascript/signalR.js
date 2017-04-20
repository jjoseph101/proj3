 
  var ConnectionID;
 
  $(function () {

     

		
            	var connection = $.hubConnection('http://echoingwallapiservice.azurewebsites.net:80/');
            	var contosoChatHubProxy = connection.createHubProxy('ChatHub');

            	contosoChatHubProxy.on('ReceiveMessage', function (sender, message) {

		     // buildChatResponse (sender, message);
                       
           	 });

                connection.start().done(function(){

                ConnectionID = connection.id;


            });
         })