/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve train info from the train scheduler database.
// 4. Create a way to calculate when trains will arrive. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate minutes to next train

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDkLbSyMn8M6g3I62pYhFea4dsHCu3labg",
    authDomain: "inclassproject-210e5.firebaseapp.com",
    databaseURL: "https://inclassproject-210e5.firebaseio.com",
    projectId: "inclassproject-210e5",
    storageBucket: "inclassproject-210e5.appspot.com",
    messagingSenderId: "960892896043"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var first = moment($("#first-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: destination,
      first: first,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
  
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var first = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(first);
    console.log(frequency);
  
    // Prettify the train start time
    var empFirstPretty = moment.unix(first).format("HH:mm");
  
    // Calculate minutes to next train using hardcore math
    // To calculate minutes to next train
    var nextTrain = moment().diff(moment.unix(first, "X"), "minutes");
    console.log(nextTrain);
  
    // Calculate the total billed rate
   // var empBilled = nextTrain * first;
 //   console.log(empBilled);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    empFirstPretty + "</td><td>" + nextTrain + "</td><td>" + first + "</td></tr>");
  });
  