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
//moment().startOf('hour').fromNow();      

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

  // Prettify the train arrival

  console.log(trainMinutes);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(start),
    $("<td>").text(rate),
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
     //updates html on child_added
     database.ref().on("child_added", function (snapshot) {
      var minutes;
      $(".name").append("<hr><div>" + snapshot.val().name + "</div>");
      $(".dest").append("<hr><div>" + snapshot.val().dest + "</div>");
      $(".frequency").append("<hr><div>" + snapshot.val().frequency + "</div>");
      $(".start").append("<hr><div>" + moment(snapshot.val().start, "X").format("lll") + "</div>");
      var diff = moment().diff(moment(snapshot.val().start, "X").format("lll"), "minutes");
      if (diff >= 0) {
          var remainder = diff % snapshot.val().frequency;
          minutes = snapshot.val().frequency - remainder;
          console.log(minutes);
          $(".next").append("<hr><div>" + moment().add(minutes, "minutes").format("lll") + "</div>");
          $(".minutes").append("<hr><div>" + minutes + "</div>");
      } else {
          $(".next").append("<hr><div>" + moment(snapshot.val().start, "X").format("lll") + "</div>");
          $(".minutes").append("<hr><div>" + moment(snapshot.val().start, "X").diff(moment(), "minutes") + "</div>");
      }      
  })
});
