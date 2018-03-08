$(document).ready(()=>{
  // ********************************************
  // VARIABLES
  // ********************************************
  const employeeWrap = document.getElementById('employee');
  const overlayWrap = document.getElementById('overlay-wrapper');
  const close = document.getElementById('close');
  const employeeNumber = 12;
  let employeeInfo = [];
  // ********************************************
  // EMPLOYEE INFO
  // ********************************************
  function populate(userDetails) {
      for (let i = 0; i < userDetails.length; i++) {
        let employee = userDetails[i];
        let name = employee.name.first + ' ' + employee.name.last;
        let avatar = employee.picture.large;
        let email = employee.email;
        let userName = employee.login.username;
        let cell = employee.cell;
        let address = employee.location.street + ', ' + employee.location.state + ' ' + employee.location.postcode;
        let city = employee.location.city;
        let dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit'};
        let bday = 'Birthday: ' + new Date(employee.dob).toLocaleDateString('en-US', dateOptions);
          
        employeeInfo.push({
          "index" : i,
          "img": avatar,
          "name": name,
          "email" : email,
          "userName" : userName,
          "cell" : cell,
          "address" : address,
          "city" : city,
          "bday" : bday
        });
      }
  } // end of the details request

  // ********************************************
  // SET EMPLOYEE DIV CONTENT
  // ********************************************
  function setEmployee(employee) {
    let employeeDiv = '<div class="employee" data-index="'+employee.index+'">';
    employeeDiv += '<img class="avatar" data-index="' + employee.index + '" src="' + employee.img + ' " alt=" ' + employee.name + ' ">';
    employeeDiv += '<div data-index="'+employee.index+'">';
    employeeDiv += '<p class="employee-name" data-index="'+employee.index+'">' + employee.name + '<p>';
    employeeDiv += '<p class="employee-email" data-index="'+employee.index+'">' + employee.email + '</p>';
    employeeDiv += '<p class="employee-city" data-index="'+employee.index+'">' + employee.city + '</p>';
    employeeDiv += '</div></div>';

    $("#employee").append(employeeDiv);
  }

  // ********************************************
  // DEFINE MODAL CONTENT
  // ********************************************
  function setOverlay(employee) {       
    let overlay = $('#overlay-content');

    let overlayDiv = '<div id="overlay"><span id="close" class="close">&times;</span>';
    overlayDiv += '<img class="avatar" data-index="' + employee.index + '" src="' + employee.img + ' " alt=" ' + employee.name + ' ">';
    overlayDiv += '<p class="employee-name">' + employee.name + '</p>';
    overlayDiv += '<p class="overlay-email">'+ employee.userName + '</p>';
    overlayDiv += '<p class="overlay-city">'+ employee.city + '</p>';
    overlayDiv += '<hr class="hr">';
    overlayDiv += '<p class="overlay-cell">'+ employee.cell + '</p>';
    overlayDiv += '<p class="overlay-address">'+ employee.address+ '</p>';
    overlayDiv += '<p class="overlay-dob">Birthday: '+ employee.bday + '</p>';
    overlayDiv += '</div>';

    overlay.html(overlayDiv);
  } //end setOverlay


  // ********************************************
  // OPEN MODAL ON CLICK
  // ********************************************
  $(employeeWrap).on('click', e => { // Attach a delegated event handler (employeeWrap)
    overlayWrap.style.display = "block";
    let selected = e.target; // Gets clicked item
    let selectedIndex = $(selected).data('index'); //Indentifies index of clicked on node
    setOverlay(employeeInfo[selectedIndex]);
  });
  // ********************************************
  // MODAL CONTROLS
  // ********************************************
  // Close modal by clicking X
  $('#overlay-wrapper').on('click', '#close', e=> { // Attach a delegated event handler (overlay)
    let clicked = e.target; // Gets employee wrapper 
    $('#overlay').text('');
    $("#overlay").css("display", "none");
    $("#overlay-wrapper").css("display", "none");
  }); 

  // Close modal by clicking outside
  window.onclick = function(event) {
    if (event.target == overlayWrap) {
      $('#overlay').text('');
      $("#overlay").css("display", "none");
      $("#overlay-wrapper").css("display", "none");
    }    
  };

  //Make arrows navigate to/show previous/next employee
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  //let current = employee.index; 
  // get index value of current modal
  let currentModal = document.getElementById('overlay');
  previous.onclick = function() {
    //show modal of employee[i] - 1
    //currentModal.style.display = "none";
    console.log(employee[i]);
  }
  next.onclick = function() {
    //show modal of employee[i] - 1
    //currentModal.style.display = "none";
    console.log(employee[i]);
  }


  // ********************************************
  // USER SEARCH
  // ********************************************
  const userSearch = document.querySelector("input[id='user-search']");
  $(userSearch).keyup(function(){
    // Retrieve the input field text 
    var filter = $(this).val();
    // Loop through the employee div 
    $(".avatar").each(function(){
        var employeeName = $(this).attr('alt').search(new RegExp(filter, "i"));
        if (employeeName < 0) {  
            $(this).parent().fadeOut();
        // Show the div item if the phrase matches 
        } else {
            $(this).parent().show();
        }
    });
  });

  // ********************************************
  // AJAX REQUEST
  // ********************************************
  $.ajax({
    url: 'https://randomuser.me/api/?results='+employeeNumber+'&inc=name,picture,email,login,location,dob,cell&nat=us',
    dataType: 'json',
    error: function() {
      console.error("Couldn't get users from API");
    },
    success: function(data) {
      populate(data.results);
      for (let i = 0; i < employeeNumber; i++) {
        setEmployee(employeeInfo[i]);
      }
    }
  });

}); //end document. ready
