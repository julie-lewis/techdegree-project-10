$(document).ready(()=>{
  // ********************************************
  // VARIABLES
  // ********************************************
  const employeeWrap = document.getElementById('employee');
  const overlayWrap = document.getElementById('overlay-wrapper');
  const employeeNumber = 12;
  let employeeInfo=[];
  // ********************************************
  // EMPLOYEE INFO
  // ********************************************
  function populate(userDetails){
      for (let i = 0; i< userDetails.length ; i++) {
        let employee= userDetails[i];
        let name = employee.name.first + ' ' + employee.name.last;
        let avatar = employee.picture.medium;
        let avatarImg = '<img class="avatar" src=" ' + avatar + ' " alt='+name+'>';
        let email = employee.email;
        let cell = employee.cell;
        let address = employee.location.street + ', ' + employee.location.state + ' ' + employee.location.postcode;
        let city = employee.location.city;
        let dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit'};
        let bday = 'Birthday: ' + new Date(employee.dob).toLocaleDateString('en-US', dateOptions);
          
        employeeInfo.push({
          "index" : i,
          "img": avatarImg,
          "name": name,
          "email" : email,
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
    let employeeDiv = '<div class="employee">';
    employeeDiv+= '<div>' +employee.img+ '</div>';
    employeeDiv+= '<div>';
    employeeDiv+= '<p class="employee-name" >' + employee.name + '<p>';
    employeeDiv+= '<p class="employee-email">' +employee.email + '</p>';
    employeeDiv+= '<p class="employee-city">' +employee.city + '</p>';
    employeeDiv+= '</div></div>';
    $("#employee").append(employeeDiv);
    }


  // ********************************************
  // DEFINE MODAL CONTENT
  // ********************************************
    function setOverlay(employee) {
         
    let overlayDiv = '<div id="overlay">';
    overlayDiv += employee.img;
    overlayDiv += '<p class="overlay-name">' + employee.name + '</p';
    overlayDiv += '<p class="overlay-email">'+ employee.email + '</p>';
    overlayDiv += '<p class="overlay-city">'+ employee.city + '</p>';
    overlayDiv += '<hr class="hr">';
    overlayDiv += '<p class="overlay-cell">'+ employee.cell + '</p>';
    overlayDiv += '<p class="overlay-address">'+ employee.address+ '</p>';
    overlayDiv += '<p class="overlay-dob">Birthday: '+ employee.bday + '</p>';
    overlayDiv += '</div>';
    $("#overlay-wrapper").append(overlayDiv);
  } //end setOverlay

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
      for (let i = 0; i< employeeNumber ; i++) {
        setEmployee(employeeInfo[i]);
      }
    }
  });



  // //Generate random users from randomuser.me
  // function populate(randomUsers){
  //   for (var i = 0; i < randomUsers.length; i++) {
  //     var employee = randomUsers[i];
  //     var newEmployeeDiv = document.getElementById('employee');
  //     var employeeDiv = document.createElement('div');
  //     employeeDiv.className = 'employee';
  //     //INPUT employee AVATAR
  //     var imageDiv = document.createElement('div');
  //     var img = document.createElement('img');
  //     img.src = employee.picture.medium;
  //     img.alt = employee.name.first + ' ' + employee.name.last;
  //     img.className ='avatar';
  //     imageDiv.appendChild(img);
  //     employeeDiv.appendChild(imageDiv);
  //     var detailsDiv = document.createElement('div');
  //     //Name
  //     var name = document.createElement('p');
  //     name.className = 'employee-name';
  //     name.innerHTML = employee.name.first + ' ' + employee.name.last;
  //     detailsDiv.appendChild(name);
  //     // Email
  //     var email = document.createElement('p');
  //     email.innerHTML = employee.email;
  //     email.className = 'employee-email';
  //     detailsDiv.appendChild(email);
  //     // City
  //     var city = document.createElement('p');
  //     city.innerHTML = employee.location.city;
  //     city.className = 'employee-city';
  //     detailsDiv.appendChild(city);
  //     employeeDiv.appendChild(detailsDiv);
  //     newEmployeeDiv.appendChild(employeeDiv);
  //     // ADD ITEMS TO OVERLAY
  //     var overlayWrap = document.getElementById('overlay-wrapper');
  //     var overlayDiv = document.createElement('div');
  //     overlayDiv.id ='overlay';
  //     //OVERLAY X
  //     var close = document.createElement('span');
  //     close.id ='close';
  //     close.className ='close';
  //     close.innerHTML = '&times;';
  //     overlayDiv.appendChild(close);
  //     //OVERLAY Image
  //     var overlayImg = document.createElement('img');
  //     overlayImg.src = employee.picture.large;
  //     overlayImg.alt = employee.name.first + ' ' + employee.name.last;
  //     overlayImg.className ='overlay-image';
  //     overlayDiv.appendChild(overlayImg);
  //     //OVERLAY Name
  //     var overlayName = document.createElement('p');
  //     overlayName.className = 'employee-name';
  //     overlayName.innerHTML = employee.name.first + ' ' + employee.name.last;
  //     overlayDiv.appendChild(overlayName);
  //     //OVERLAY Email
  //     var overlayEmail = document.createElement('p');
  //     overlayEmail.innerHTML = employee.login.username;
  //     overlayEmail.className = 'employee-email';
  //     overlayDiv.appendChild(overlayEmail);
  //     //OVERLAY City
  //     var overlayCity = document.createElement('p');
  //     overlayCity.innerHTML = employee.location.city;
  //     overlayCity.className = 'employee-city';
  //     overlayDiv.appendChild(overlayCity);
  //     //OVERLAY HR
  //     var overlayHR = document.createElement('hr');
  //     overlayDiv.appendChild(overlayHR);
  //     //OVERLAY Phone
  //     var overlayPhone = document.createElement('p');
  //     overlayPhone.innerHTML = employee.cell;
  //     overlayPhone.className = 'employee-phone';
  //     overlayDiv.appendChild(overlayPhone);
  //     //OVERLAY Address
  //     var overlayAddress = document.createElement('p');
  //     overlayAddress.innerHTML = employee.location.street + ', ' + employee.location.state + ' ' + employee.location.postcode;
  //     overlayAddress.className = 'employee-address';
  //     overlayDiv.appendChild(overlayAddress);
  //     //OVERLAY Birthday
  //     var overlayBday = document.createElement('p');
  //     var dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit'};
  //     overlayBday.innerHTML = 'Birthday: ' + new Date(employee.dob).toLocaleDateString('en-US', dateOptions);
  //     overlayBday.className = 'employee-bday';
  //     overlayDiv.appendChild(overlayBday);
  //     overlayWrap.appendChild(overlayDiv);
  //   }
  // }


  // ********************************************
  // USER SEARCH
  // ********************************************
  var userSearch = document.querySelector("input[id='user-search']");

  $(document).ready(function () {

      $(userSearch).keyup(function(){

          // Retrieve the input field text 
          var filter = $(this).val();

          // Loop through the employee div 
          $(".avatar").each(function(){
              var employeeName = $(this).attr('alt').search(new RegExp(filter, "i"));
              if ( employeeName < 0) {  
                  $(this).parent().parent().fadeOut();

              // Show the div item if the phrase matches 
              } else {
                  $(this).parent().parent().show();
              }
          });
       });
   });


  // ********************************************
  // MODAL DISPLAY
  // ********************************************
  // Get the modal
  var modal = document.getElementById('overlay-wrapper');
  // Get the button that opens the modal
  var btn = document.getElementById('employee');
  // Get the <span> element that closes the modal
  var span = document.getElementById('close');
  // When the user clicks on the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  } 
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }


  //Make arrows navigate to/show previous/next employee
  var previous = document.getElementById('previous');
  var next = document.getElementById('next');
  //var current = employee[i];
  var currentModal = document.getElementById('overlay');

  // get index value of current modal
  // #next on click => hide modal of employee[i], show modal of employee[i] + 1
  previous.onclick = function() {
      //currentModal.style.display = "none";
  }
  // #previous on click => hide modal of employee[i], show modal of employee[i] -1
  next.onclick = function() {
      //currentModal.style.display = "none";
  }



}); //end document. ready
