var animals = ["platypus", "black widow", "sloth", "killer whale", "will smith", "kitten", "bowser", "flying squirrel", "groundhog", "whale"];

// display gifs on screen
function displayAnimals() {
	var animal = $(this).attr("data-name");
	//scroll to top after you click
	$("html, body").animate({ scrollTop: 0 }, 600);
	//call giffy api
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";
	//ajax call for specific button click
    $.ajax({
      url: queryURL,
      data: {limit: 10, order: 'desc'}, 
      method: 'GET'
      }).then(function(response) {
      	console.log (response);

        	var results = response.data;
        	console.log(results);

	        	for (var i = 0; i < results.length; i++) {
	        	
		        	var showDiv = $("<div class='col-md-6' 'col-xs-12' >");

		        	var rating = results[i].rating;
		        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
		        	var staticSrc = results[i].images.fixed_height_still.url;
		        	var showImage = $("<img>");
		        	var p = $("<p>").text("Rating: " + rating);

		        	showImage.attr("src", staticSrc);
		        	showImage.addClass("playAnimals");
		        	showImage.attr("data-state", "still");
		        	showImage.attr("data-still", staticSrc);
		        	showImage.attr("data-animate", defaultAnimatedSrc);
		        	showDiv.append(p);
		        	showDiv.append(showImage);
		        	$("#animals").prepend(showDiv);

	            }
	    });

      }



// Function for displaying animal data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#animalButtons").empty();

    // Looping through the array of movies
    for (var i = 0; i < animals.length; i++) {

	    // Then dynamicaly generating buttons for each movie in the array
	    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
	    var a = $("<button>");
	    // Adding a class of movie-btn to our button
	    a.addClass("animal-btn");
	    // Adding a data-attribute
	    a.attr("data-name", animals[i]);
	    // Providing the initial button text
	    a.text(animals[i]);
	    // Adding the button to the buttons-view div
	    $("#animalButtons").append(a);
        }
}

      // This function handles events where a animal button is clicked
      $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of the animal array
        renderButtons();
      });

// still and animate clicks
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

$(document).on("click", ".playAnimals", pausePlayGifs);


// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animal-btn", displayAnimals) 

// Calling the renderButtons function to display the intial buttons
renderButtons();


    












