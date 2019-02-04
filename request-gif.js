/*
This is part of LaunchCode Unit-3 class for front-end development.
Uses HTML, CSS styling, AJAX and Javascript.
Created by Radhakrishnan Pillai for LaunchCode Unit-3
*/

/*
This Launchcode unit-3 assaignement addresses one of the classic problems in computer science of how to 
optimally implement a web page that displays GIFs of the Jackson 5.

The basic goal of this module will be to fetch a GIF from Giphy, and then insert it into the DOM to 
display it on your page. We'll get into the details shortly, but first, let's play with Giphy for a minute.


The Goal:

- The main page  should provide the user with a form where she can type a search query:

- Upon submitting the form, the user should briefly see an indication that something awesome is about to happen: “Loading” for example.

- After a little while, the user should see a GIF appear!

- If the user clicks the button again, even with the same search term, a new request should be sent, yielding a (probably) new GIF.

- The gif should ideally be relevant to both the user's search term ("dance" in this case) and the Jackson 5 (or at least Michael), but depending on the search term, and just luck-of-the-draw, you might find that only one or the other could be satisfied.

- Finally, it is possible that something might go wrong in the process of making the request. If so, you should report an error to the user, like “No GIF for you”

*/


$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    // get the user's riddle answer from the DOM
    var riddleQuery = $(":input[name='riddleAnswer']").val();

    // if we get the wrong answer,  error and quit
    if (!(riddleQuery == "5" || riddleQuery.toLowerCase() == "five"))
    {
      $("#feedback").attr("hidden", false).text("No GIF for you!").css('color', 'red');
      setGifLoadedStatus(false);
      return null;
    }

    // TODO should be e.g. "dance"
    // get the user's input text from the DOM
    var searchQuery = $(":input[name='tag']").val();

    // configure a few parameters to attach to our request
    var params = {
        api_key: "dc6zaTOxFJmzC",
        tag : "jackson 5" + searchQuery // TODO should be e.g. "jackson 5 dance"
    };

    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.

            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            //console.log("we received a response!");
            //console.log(response);

            // TODO
            // 1. set the source attribute of our image to the image_url of the GIF
            $("#gif").attr("src",response.data.image_url);
            // 2. hide the feedback message and display the image
            setGifLoadedStatus(true);
        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function

            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });

    // TODO
    // give the user a "Loading..." message while they wait
    $("#feedback").text("Loading...");
    setGifLoadedStatus(false);

}

/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}
