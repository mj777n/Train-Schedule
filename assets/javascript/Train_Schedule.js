// *************** BEGIN JavaScript ***************
// ************************************************
//            LINKS FOR FIREBASE ARE IN HTML 

// Myy app's Firebase configuration
var config = {
    apiKey: "AIzaSyBn63BLMj5pCG6dcsN0uSdIg8C3XTSQFvw",
    authDomain: "train-times-a2370.firebaseapp.com",
    databaseURL: "https://train-times-a2370.firebaseio.com",
    projectId: "train-times-a2370",
    storageBucket: "",
    messagingSenderId: "983113251711",
    appId: "1:983113251711:web:dd4f0854e258e05f"
  };
  // Initialize Firebase
firebase.initializeApp(config);  
  // Create a variable to reference the database
var database = firebase.database();
  // Initial variable Values
var trainName = "";
var dest = "";
var firstTrain = "";
var freq = "";
  
  // Capture Button Click for adding new Train
$("#add-train-btn").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
  event.preventDefault();
    // Capture user inputs and store them into variables
  var trainName = $("#trainName-input").val().trim();
  var dest = $("#dest-input").val().trim();
  var firstTrain = $("#firstTrain-input").val().trim();
  var freq = $("#freq-input").val().trim();   
    // Capture inputs and store them in array newTrain
  var newTrain = {
      addName:       trainName,
      addDest:       dest,
      addFirstTrain: firstTrain,
      addFreq:       freq,
    };
    // Uploads employee data to the database
  database.ref().push(newTrain);
    // Clears all of the text-boxes
  $("#trainName-input").val("");
  $("#dest-input").val("");
  $("#firstTrain-input").val("");
  $("#freq-input").val("");
});  // and onclick add-train event  // end database.ref push - triggers function below

//Create Firebase event for adding newTrain data to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(newTrainSnapshot) {
// console.log(newTrainSnapshot.val());
    // Store everything into a variable.
  var trainName =  newTrainSnapshot.val().addName;
  var dest =       newTrainSnapshot.val().addDest;
  var firstTrain = newTrainSnapshot.val().addFirstTrain;
  var freq =       newTrainSnapshot.val().addFreq;

  // Establish variables to calculate Next Arrival and Minutes Away
  // var firstTrainConverted holds time entered, converted using moment.js library
  // (pushed back 1 year to make sure it comes before current time)
var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
var currentTime = moment();

  // Calculate difference between the times - using moment.js library
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

  // Time apart (remainder)
var tRemainder = diffTime % freq;

  // Minute Until Train is the remainder subtracted from the interval
var minutesAway = freq - tRemainder;

  // Next Train
var nextTrain = moment().add(minutesAway, "minutes");
  // Create variable with tr and td tags - placing data in a row with fields appended 
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(dest),
    $("<td>").text(freq),    
    $("<td>").text(moment(nextTrain).format("hh:mm A")),        
    $("<td>").text(minutesAway),
  );
  // Append the new row to the table/displaying text of user inputs & results on dom
    $(".train-table > tbody").append(newRow);        
});  // end child_added call when database pushed into /(ie. new train data is received)


