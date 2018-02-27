// ********************************************
// EMPLOYEES
// ********************************************
//Generate Random Users, call in info
$.ajax({
  url: 'https://randomuser.me/api/?results=12&inc=name,picture,email,login,location,dob,cell&nat=us',
  dataType: 'json',
  error: function() {
    console.error("Couldn't get users from API");
  },
  success: function(data) {
    users = data.results;
    populate(users);
  }
});

//Generate random users from randomuser.me
function populate(randomUsers){
  for (var i = 0; i < randomUsers.length; i++) {
    var employee = randomUsers[i];
    var newEmployeeDiv = document.getElementById('employee');
    var employeeDiv = document.createElement('div');
    employeeDiv.className = 'employee';
    //INPUT employee AVATAR
    var imageDiv = document.createElement('div');
    var img = document.createElement('img');
    img.src = employee.picture.medium;
    img.alt = employee.name.first + ' ' + employee.name.last;
    img.className ='avatar';
    imageDiv.appendChild(img);
    employeeDiv.appendChild(imageDiv);
    var detailsDiv = document.createElement('div');
    //Name
    var name = document.createElement('p');
    name.className = 'employee-name';
    name.innerHTML = employee.name.first + ' ' + employee.name.last;
    detailsDiv.appendChild(name);
    // Email
    var email = document.createElement('p');
    email.innerHTML = employee.email;
    email.className = 'employee-email';
    detailsDiv.appendChild(email);
    // City
    var city = document.createElement('p');
    city.innerHTML = employee.location.city;
    city.className = 'employee-city';
    detailsDiv.appendChild(city);
    employeeDiv.appendChild(detailsDiv);
    newEmployeeDiv.appendChild(employeeDiv);
    // ADD ITEMS TO OVERLAY
    var overlayWrap = document.getElementById('overlay-wrapper');
    var overlayDiv = document.createElement('div');
    overlayDiv.id ='overlay';
    //OVERLAY X
    var close = document.createElement('span');
    close.id ='close';
    close.className ='close';
    close.innerHTML = '&times;';
    overlayDiv.appendChild(close);
    //OVERLAY Image
    var overlayImg = document.createElement('img');
    overlayImg.src = employee.picture.large;
    overlayImg.alt = employee.name.first + ' ' + employee.name.last;
    overlayImg.className ='overlay-image';
    overlayDiv.appendChild(overlayImg);
    //OVERLAY Name
    var overlayName = document.createElement('p');
    overlayName.className = 'employee-name';
    overlayName.innerHTML = employee.name.first + ' ' + employee.name.last;
    overlayDiv.appendChild(overlayName);
    //OVERLAY Email
    var overlayEmail = document.createElement('p');
    overlayEmail.innerHTML = employee.login.username;
    overlayEmail.className = 'employee-email';
    overlayDiv.appendChild(overlayEmail);
    //OVERLAY City
    var overlayCity = document.createElement('p');
    overlayCity.innerHTML = employee.location.city;
    overlayCity.className = 'employee-city';
    overlayDiv.appendChild(overlayCity);
    //OVERLAY HR
    var overlayHR = document.createElement('hr');
    overlayDiv.appendChild(overlayHR);
    //OVERLAY Phone
    var overlayPhone = document.createElement('p');
    overlayPhone.innerHTML = employee.cell;
    overlayPhone.className = 'employee-phone';
    overlayDiv.appendChild(overlayPhone);
    //OVERLAY Address
    var overlayAddress = document.createElement('p');
    overlayAddress.innerHTML = employee.location.street + ', ' + employee.location.state + ' ' + employee.location.postcode;
    overlayAddress.className = 'employee-address';
    overlayDiv.appendChild(overlayAddress);
    //OVERLAY Birthday
    var overlayBday = document.createElement('p');
    var dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit'};
    overlayBday.innerHTML = 'Birthday: ' + new Date(employee.dob).toLocaleDateString('en-US', dateOptions);
    overlayBday.className = 'employee-bday';
    overlayDiv.appendChild(overlayBday);
    overlayWrap.appendChild(overlayDiv);
  }
}


// ********************************************
// MODAL DISPLAY
// ********************************************
// Get the modal
var modal = document.getElementById('overlay-wrapper');
// Get the button that opens the modal
var btn = document.getElementById("employee");
// Get the <span> element that closes the modal
var span = document.getElementsByTagName('span');
// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function(event) {
    if (event.target == span) {
    modal.style.display = "none";
  }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 


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



