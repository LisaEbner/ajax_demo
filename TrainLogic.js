// Steps to complete:


// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBXDFUojNWtYuhG6Kj8wn5IiIpCxCY7KK4",
    authDomain: "time-js-9-24-19.firebaseapp.com",
    databaseURL: "https://time-js-9-24-19.firebaseio.com",
    projectId: "time-js-9-24-19",
    storageBucket: "",
    messagingSenderId: "605842763481",
    appId: "1:605842763481:web:d6fc8b9bbebbdd459618c8"
};

firebase.initializeApp(config);
console.log(config)

var database = firebase.database();
console.log(database)
// 2. Button for adding Trains
$(document).on("click","#add-train-btn", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var start = moment($("#start-input").val().trim());
  var rate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding trains info

  var newTrain = {
    name: trainName,
    destination: destination,
    start: start,
    rate: rate
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var start = moment(childSnapshot.val().start);
  var rate = childSnapshot.val().rate;
  var nextArrival = start;
  var timeNow = moment();
console.log(timeNow, "timeNow")
// while(nextArrival<timeNow){
//  moment(nextArrival).add(rate, 'm')
// }

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(start, "Start");
  console.log(rate);

  // Prettify the employee start

  // Calculate the months worked using hardcore math
  // To calculate the months worked

  console.log(trainMonths);

  // Calculate the total billed rate

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(start),
    $("<td>").text(rate),
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
