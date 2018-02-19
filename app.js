// ********************************************
// VARIABLES
// ********************************************
//Top Layer
var body = document.body;
var modalNumber = 0;
// Alert Box
var alertBox = document.getElementById('alert');
var closeAlert = document.getElementById('close-alert');
// Charts
var statFilterButtons = document.getElementsByClassName('stat-filter');
var trafficChartCanvas = document.getElementById('traffic-line-chart');
var dailyTrafficChartCanvas = document.getElementById('daily-traffic-bar-chart');
var mobileUsersChartCanvas = document.getElementById('mobile-users-doughnut-chart');
// employeeSearch
var userSearch = document.querySelector("input[id='user-search']");
var userDatalist = document.getElementById('matching-users');
var searchResult = [];
//Users
var users = null;
//Send Message
var sendButton = document.getElementById('send');
var messageDiv = document.getElementById('message-user');
var message = '';
var messageNotification = document.createElement('p');

// ********************************************
// NOTIFICATIONS & ALERT BOX
// ********************************************
/*Listens for click on bell icon, creates invisible notification icon and modal messages
bell.addEventListener('click', function(event){
  event.target.removeEventListener('click', event);
  notification.setAttribute('style', 'opacity: 0');
  modal('10 New Users have joined today - Say Hello!');
  modal('You have been mentioned in a new comment.');
});
//Creates overlay divs for modal messages if modals exist
function modal(notification){
  if(modalNumber === 0){
    var modal = document.createElement('div');
    modal.id = 'overlay';
    modal.className = 'overlay';
    body.appendChild(modal);
  }
  modalNumber++;
  //Puts modal content div 'modal' inside 'overlay' div
  var modalOverlay = document.getElementById('overlay');
  var modalContent = document.createElement('div');
  modalContent.id = 'modal'+modalNumber;
  modalContent.className = 'modal';
  modalContent.setAttribute('style', 'z-index: 100; border-radius: 5px');
  modalOverlay.appendChild(modalContent);
  //Inputs modal notification inside new p in 'modal' div
  var notice = document.createElement('p');
  notice.innerHTML = notification;
  modalContent.appendChild(notice);
  //Creates closing 'X' and removes modal notifications when clicked
  var close = document.createElement('p');
  close.className = 'close-modal';
  close.innerHTML = 'x';
  close.addEventListener('click', function(){
    modalContent.setAttribute('style', 'display: none');
    modalNumber--;
    if(modalNumber === 0){
      modalOverlay.remove();
    }
  });
  modalContent.appendChild(close);
}
// CLOSES ALERT BOX ON CLICK
closeAlert.addEventListener('click', function(){
  alertBox.setAttribute('style', 'display: none');
});
*/

// ********************************************
// employees
// ********************************************
$.ajax({
  url: 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,dob,phone&nat=us',
  dataType: 'json',
  error: function() {
    console.error("Couldn't get users from API");
  },
  success: function(data) {
    users = data.results;
    populate(users);
  }
});
// Add UPPERCASE to 1st char
function firstUp(string){
  return string[0].toUpperCase() + string.substring(1);
}
//Generate random users from randomuser.me
function populate(randomUsers){
  var newEmployeeDiv = document.getElementById('employee');
  var overlayDiv = document.getElementById('overlay');
  for (var i = 0; i < randomUsers.length; i++) {
    var employee = randomUsers[i];
    var employeeDiv = document.createElement('div');
    employeeDiv.className = 'employee';
    //INPUT employee AVATAR
    var imageDiv = document.createElement('div');
    var img = document.createElement('img');
    img.src = employee.picture.medium;
    img.alt = firstUp(employee.name.first) + ' ' + firstUp(employee.name.last);
    img.className ='avatar';
    imageDiv.appendChild(img);
    employeeDiv.appendChild(imageDiv);
    // Input 16 New employees
    if (i <= 11){
      var detailsDiv = document.createElement('div');
      //Name
      var name = document.createElement('p');
      name.className = 'employee-name';
      name.innerHTML = firstUp(employee.name.first) + ' ' + firstUp(employee.name.last);
      detailsDiv.appendChild(name);
      // Email
      var email = document.createElement('p');
      email.innerHTML = employee.email;
      email.className = 'employee-email';
      detailsDiv.appendChild(email);
      // City
      var city = document.createElement('p');
      city.innerHTML = firstUp(employee.location.city);
      city.className = 'employee-city';
      detailsDiv.appendChild(city);
      employeeDiv.appendChild(detailsDiv);
      newEmployeeDiv.appendChild(employeeDiv);
      // ADD ITEMS TO OVERLAY

      //X
      var close = document.createElement('p');
      close.id ='close';
      close.innerHTML = '&times;';
      overlayDiv.appendChild(close);
      //Image
      var overlayImg = document.createElement('img');
      overlayImg.src = employee.picture.large;
      overlayImg.alt = firstUp(employee.name.first) + ' ' + firstUp(employee.name.last);
      overlayImg.className ='overlay-image';
      overlayDiv.appendChild(overlayImg);
      //Name
      var overlayName = document.createElement('p');
      overlayName.className = 'employee-name';
      overlayName.innerHTML = firstUp(employee.name.first) + ' ' + firstUp(employee.name.last);
      overlayDiv.appendChild(overlayName);
      // Email
      var overlayEmail = document.createElement('p');
      overlayEmail.innerHTML = employee.email;
      overlayEmail.className = 'employee-email';
      overlayDiv.appendChild(overlayEmail);
      // City
      var overlayCity = document.createElement('p');
      overlayCity.innerHTML = firstUp(employee.location.city);
      overlayCity.className = 'employee-city';
      overlayDiv.appendChild(overlayCity);
    }
  }
}

// ********************************************
// MESSAGE USER
// ********************************************
// SEARCH FOR USER
userSearch.onkeyup = function(){
  var input = userSearch.value;
  searchResult = [];
  var options = '';
  // Checking typing in input field
  while (userDatalist.firstChild) {
    userDatalist.removeChild(userDatalist.firstChild);
  }
  // Checking for blank input
  if (input !== ''){
    //Loop thru and check for match
    for (var i = 0; i < users.length; i++){
      if (users[i].name.first.includes(input) || users[i].name.first.includes(input)){
        searchResult.push(users[i]);
      }
    }
    // Populate search options
    for (var i = 0; i < searchResult.length; i++) {
      var name = firstUp(searchResult[i].name.first) + ' ' + firstUp(searchResult[i].name.last);
      options += '<option value="' + name + '" />';
      userDatalist.innerHTML = options;
    }
  }
};
/*SEND BUTTON
sendButton.addEventListener('click', function(e){
  var userSearch = document.querySelector("input[id='user-search']");
  var userMessage = document.getElementById('message').value;
  var validUser = false;
  for (var i = 0; i < searchResult.length; i++) {
    var userInfo = firstUp(searchResult[i].name.first) + ' ' + firstUp(searchResult[i].name.last);
    if (userInfo === userSearch.value){
      validUser = true;
    }
  }
  // Check input and display submit message
  if (userMessage !== '' && userMessage !== null && validUser === true){
    message = 'Message sent successfully';
    messageNotification.innerHTML = (message);
    messageDiv.appendChild(messageNotification);
  }
  else {
    message = 'Please choose a employee and write a message';
    messageNotification.innerHTML = (message);
    messageDiv.appendChild(messageNotification);
    var validUser = false;
  }
});
*/
