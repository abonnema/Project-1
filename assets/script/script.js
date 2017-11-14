//JQUERY INTRODUCTION
// Test code for the functioning of the Server;
$(document).ready(function() {


    // Trying to interperet JSONP response for Edamam API;
    function jsonCallback(json) {
        console.log(json);
    }

    function logResults(json) {
        console.log(json);
    }


    //CREATE CLICK FUNCTION TO RUN API FUNCTIONS;

    //SEPEARTING EDAMAM API
    function searchRecipe(searchFood) {
        //GLOBAL EDAMAM VARIABLES;
        //var apiNutKey = "3413a3675f84f8490cefcc722d559d39";
        //var apiNutID = "be4b8311";

        //EDAMAM KEYS;
        var apiRecKey = "e8b036bdd9a6347775ea2c30690c2d94";
        var apiRecID = "7cd61c30";

        //SEARCH INPUT;
        var searchFood = $("input").eq(0).val();
        var dummySearch = "banana";

        //VITAMIN DEFICIENCIES INPUT;
        var vitaminCount = $(".def").val().trim();
        
        //INDEX DISPLAY TOTAL = 10;
        var fromIndex = 0;
        var toIndex = 10;
        
        //CALORIE INPUT;
        var caloriesMin = "gte%0";
        var caloriesMax = "lte%20722";

        //HEALTH INPUT FUNCTION (VEGATARIAN, VEGAN, OMNIVORE);
        var health = "vegan"; 

        //JSONP CALLBACK FUNCTION
        var callback = "?";

        //queryURL creation
        var queryURL = "https://api.edamam.com/search?q=" + dummySearch + "&app_id=" + apiRecID + "&app_key=" + apiRecKey + "&from="+ fromIndex + "&to=" + toIndex + "&calories=" + caloriesMin + ",%20" + caloriesMax + "&health=" + health + "&callback=food";
        console.log(queryURL);
        // AJAX Pull
        $.ajax({
            url: queryURL,
            method: "GET",
            jsonpCallback: "food",
            dataType: "jsonp",
            data: {

            }
        },
        )

        //DISPLAY DATA
        .then(data => {
            data.hits.forEach(nom => $('.data-header').append(`<p>${nom.recipe.label}</p> <img src=${nom.recipe.image}></img>`));
            console.log(data.hits);
        },
        )

        //DONE FUNCTION TO RECORD RESPONSE
        .done(function(response) {
            // Log the queryURL;
            console.log(queryURL);
            // Log the resulting object;
            console.log(response);
        });
    };



    //SEPERATING ZOMATO API;
    function searchZomato(searchRest) {
        
        var lat = "";
        var long = "";
        //GEOLOCATION HTML API PULL;
        function getLocation() {
            navigator.geolocation.getCurrentPosition(showPosition);
        };
        function showPosition(position) {
            console.log(position);
            lat = position.coords.latitude; 
            long = position.coords.longitude;
            console.log(position.coords);
            console.log(long);
            console.log(position);

        };
        // FIND NEAREST RESTERAUNT
        getLocation();
        showPosition();

        //GLOBAL VARIABLES;
        //GEOLOCATION;


        //HEALTH INPUT FUNCTION (VEGATARIAN, VEGAN, OMNIVORE);
        var healthSearch = "";

        //queryURL creation
        var queryURL = "https://developers.zomato.com/api/v2.1/" + "geocode?lat=" + lat + "&lon=" + long;
        console.log(queryURL);

        //AJAX Pull
        $.ajax({
            type: "GET", 
            headers: {
            'X-Zomato-API-Key': 'c7395f5b6224146e27ac3b2feb756dd7' 
            },
            url: queryURL, 
            dataType: 'json',
            processData: true, 
            success: function(data) {
            console.log(data);
            }
        });
    };

    //RUN FUNCTIONS
    searchZomato();
    searchRecipe();
})