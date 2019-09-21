<script src=""
const firebaseConfig = {
  // 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyBvwpajoi0p8ZZQWiq8wGfWKMzW9H_tb_w",
  authDomain: "train-schedule-e032a.firebaseapp.com",
  databaseURL: "https://train-schedule-e032a.firebaseio.com",
  projectId: "train-schedule-e032a",
  storageBucket: "train-schedule-e032a.appspot.com",
  messagingSenderId: "650788225689",
  appId: "1:650788225689:web:103206abfb5acae7182e08"
};
firebase.initializeApp(config);
  
// events & functions

var database = firebase.database();
var tName = "";
var tDest = "";
var fTrain = "";
var freq = "";  

// on click button function
$("#submitTrain").on("click", function() {

  event.preventDefault();
  
  tName = $("#trainName").val().trim();
  tDest = $("#destination").val().trim();
  fTrain = $("#firstTime").val().trim();
  freq = $("#frequency").val().trim();
  
  database.ref().push({
    trainName: tName,
    destination: tDest,
    frequency: freq,
    firstTrain: fTrain
  });
  clearB();

  console.log(tName + " " + tDest + " " + fTrain + " " + freq)

});

function clearB(){
$("#trainName").val("");
$("#destination").val("");
$("#firstTime").val("");
$("#frequency").val("");
};
 
database.ref().on("child_added", function(snapshot){

  // store the snapshot value
  var sv = snapshot.val();
  console.log("NEW TRAIN ENTRY: " + sv.trainName + "----------")    
  // First Time (pushed back 1 year to make sure it comes before current time)
  var fTrainConverted = moment(sv.firstTrain, "HH:mm").subtract(1, "years");
  console.log("first time: " + fTrainConverted);

  // Current Time stored with moment.js
  var timeNow = moment();
  console.log("Current Time: " + moment().format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(fTrainConverted), "minutes");
  console.log("Difference Now-fTrain: " + diffTime);

  // Time apart Remainder
  var tRemainder = diffTime % sv.frequency;
  console.log("remdr: " + tRemainder);

  // Minute Until Train
  var nextTrainN = sv.frequency - tRemainder;
  console.log("Next Train in: " + nextTrainN);
  
  // Next Train
  var nextTrainTime = moment().add(nextTrainN, "minutes");
  console.log("Arr. Time: " + moment(nextTrainTime).format("HH:mm"));

  $("tbody").append("<tr><td>" + sv.trainName + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + moment(nextTrainTime).format("HH:mm") + "</td><td>" + nextTrainN + "</td></tr>");
  
});
