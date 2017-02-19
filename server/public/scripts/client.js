var cohorts = []; //array for person content
var currentIndex = -1; //start at -1 to allow nextCohort to increment to the 0 element

$(document).ready(function(){
  newLoadData();
  enable();

  //make ajax request
  function newLoadData(){
    $.ajax({
      url: '/data',
      method: 'GET',
      success: function(data){
        $('#dataContainer').empty();
        cohorts = data.phirephiters;
        renderCarousel();
        nextCohort();
      }
    });
  }

  //setting event listeners
  function enable(){
    $("#next-button").on("click", nextCohort);
    $("#prev-button").on("click", prevCohort);
  }

  //incrementing through cohort array and rendering content to DOM
  function nextCohort(){
    $("#dataContainer").fadeOut(400, function(){ //to do make fades global variable
      currentIndex++;
      if(currentIndex >= cohorts.length) {
        currentIndex = 0;
      }
      appendDOM();
      highlight(currentIndex);
      $("#dataContainer").fadeIn(300); //make fades global variable
    });
  }

  //decrementing through cohort array and rendering content to DOM
  function prevCohort() {
    $("#dataContainer").fadeOut(400, function() { //make fades global variable
      currentIndex--;
      if(currentIndex < 0) {
        currentIndex = cohorts.length - 1;
      }
      appendDOM();
      highlight(currentIndex);
      $("#dataContainer").fadeIn(300); //make fades global variable
    });
  }

  //building HTML, appending to DOM
  function appendDOM(){
    var person = cohorts[currentIndex];
    var $el = $('#dataContainer');
    $el.empty(); //empty container before appending new content
    var str = '<div class="person">' + '<h2>' + person.name + '</h2>' + '<h3>' + person.git_username + '</h3>' + '<h4>' + person.shoutout + '</h4>' + '</div>';
    $el.append(str);
  }

  //building carousel appending to DOM
  function renderCarousel(){
    var carouselContainer = $('#carousel');
    var blocks = "";
    for (var i = 0; i < cohorts.length; i++) {
      blocks += '<div class="box"></div>';
    }
    carouselContainer.append(blocks);
  }

  //highlighting carousel based on index
  function highlight(current){
    $('.box').removeClass('active');
    $('.box:nth-child('+ (current +1) + ')').addClass("active");
  }

});
