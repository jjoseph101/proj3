$( document ).ready(function() {

/************ Update Echos Starts *************/
  $(".newEchoes").hide();

  $("#updateEchoesButton").click(function () {
    $(".newEchoes").toggle();
  });
/************ Update Echos Ends ***************/


/************** Search Starts **************/
  $(".searchBackground").hide();

  $("#search").on("click", function(){
    $(".searchBackground").toggle();
  });
  /***************** Search Ends ********************/


  /***************** Create Starts ******************/

  $(".create").hide();

  $("#createNav").on("click", function(){
    $(".create").toggle();
});

/***************** Create Ends ********************/





  /***************** Sign-Up Starts *****************/

/*   $(".topBackground").css("background-color","#ffc90d");

  $("#signUp").on("click", function(){
    $(".topBackground").css("background-color","#282c37");
  }); */


  /****************** Sign-Up Ends ******************/


  /*********** Click on Topics Starts **************/



    $(".cell").on("click", function(){
      $("").toggle();
    });

  /************ Click on Topics Ends **************/







  /** Echo Buttons Script Starts **/

  var $grid = $('.grid'),
  emptyCells = [],
  i;

  for (i = 0; i < $grid.find('.cell').length; i++) {
    emptyCells.push($('<li>', { class: 'cell is-empty' }));
  }

  $grid.append(emptyCells);

/** Echo Buttons Script Ends **/




});
