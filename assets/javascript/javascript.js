var topics = [
    "Seattle",
    "Portland",
    "San Francisco",
    "Los Angeles",
    "Trona, CA"
];


//This function puts the renders the GIFS on the page
displayGifs = function(){
    var search = $(this).attr("value");

    var APIKey = "1yMPuh6hF03rgqCEbFV4sg11YLk34RET";
    //This is the search term (get this from UI)
    var search = $(this).attr("value");
    //This is the queryURL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + APIKey + "&limit=10";
    //This is the AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var columnDiv = $("<div>").addClass("col-md-3");
            var gifDiv = $("<div>").addClass("card m-3").attr("style", "width: 18rem;");
            var rating = results[i].rating;
            var ratingText = $("<h6>").text("Rating: " + rating).addClass("m-2");
            var gifImage = $("<img>").addClass("card-img-top gif");
            gifImage.attr({
                "src": results[i].images.fixed_width_still.url,
                "data-still": results[i].images.fixed_width_still.url,
                "data-animate": results[i].images.fixed_width.url,
                "data-state": "still"
            });
            gifDiv.append(gifImage);
            gifDiv.append(ratingText);
            columnDiv.append(gifDiv);

            $("#build").prepend(columnDiv);
        }
    })
}

//This function creates buttons from the topics array
function renderButtons(){
    //Clear old buttons
    $("#buttonBuild").text("");
for (i = 0; i < topics.length; i++) {
    
    //Build buttons from array
    var newButton = $("<button>").text(topics[i]).addClass("btn btn-dark m-3 topicButton").attr({ "type": "button", "value": topics[i] });
    $("#buttonBuild").append(newButton);
}};

//This takes user input from form and adds it to the topics array and therefore the topics button
$("#submitUserInput").on("click", function(event){
    event.preventDefault();
    var newTopic = $("#userInput").val().trim();
    topics.push(newTopic);
    renderButtons();
});

//This adds a click event listener for topic buttons
$(document).on("click", ".topicButton", displayGifs);


$(document).on("click", ".gif", function () {
    var gifState = $(this).attr("data-state");
    console.log(gifState);

    if (gifState == "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }

    if (gifState == "animate") {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
});

renderButtons();

