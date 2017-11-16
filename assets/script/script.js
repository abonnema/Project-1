//JQUERY INTRODUCTION
// Test code for the functioning of the Server;
$(document).ready(function () {
    //MATERIALIZE FUNCTIONS
    $('select').material_select();
    //INITIALIZING WITH SUBMIT BUTTON

    
        // Trying to interperet JSONP response for Edamam API;
        function jsonCallback(json) {
            console.log(json);
        }

        function logResults(json) {
            console.log(json);
        }


        //CREATE CLICK FUNCTION TO RUN API FUNCTIONS;

        //SEPEARTING EDAMAM API
        function searchRecipe() {
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
            //var vitaminCount = $(".def").val().trim();

            //INDEX DISPLAY TOTAL = 10;
            var fromIndex = 0;
            var toIndex = 10;

            //CALORIE INPUT;
            var caloriesMin = "gte%0";
            var caloriesMax = "lte%20722";
            

            //HEALTH INPUT FUNCTION (VEGATARIAN, VEGAN, OMNIVORE);
            // var restrictions = $(".restrictions").val();
            //     if (restrictions === 1) {
            //         var health = "kosher";
            //     }
            //     else if (restrictions === 2) {
            //         var health = "kosher";
            //     } 
            //     else if (restrictions === 3) {
            //         var health = "kosher";
            //     };
            var crustacean = $(".restrictions").val(1); 
                
            var deficiencies = $(".deficiencies").val(2);
            var health = "vegan";
            
            //HEALTH RESTRICTION FUNCTION

            //HEALTH DEFICIENCES FUNCTION



            //JSONP CALLBACK FUNCTION
            var callback = "?";

            //queryURL creation
            var queryURL = "https://api.edamam.com/search?q=" + dummySearch + "&app_id=" + apiRecID + "&app_key=" + apiRecKey + "&from=" + fromIndex + "&to=" + toIndex + "&calories=" + caloriesMin + ",%20" + caloriesMax + "&health=" + health + "&callback=food";
            console.log(queryURL);
            // AJAX Pull
            $.ajax({
                    url: queryURL,
                    method: "GET",
                    jsonpCallback: "food",
                    dataType: "jsonp",
                    data: {

                    }
                }, )
            
            //DISPLAY DATA
            .then(data => {
                data.hits.forEach(nom => $('.collapsible').append(`<li><div class="collapsible-header"><i class="material-icons">arrow_drop_down_circle</i><p>${nom.recipe.label}</p></div><div class="collapsible-body"><span><img src=${nom.recipe.image}></img><p>Source: ${nom.recipe.source}</p><p>Link to recipe: ${nom.recipe.url}</p><p>Health concerns: ${nom.recipe.healthLabels}</p><p>Diet concerns: ${nom.recipe.dietLabels}</p><p>Ingredients: ${nom.recipe.ingredients}<p>${nom.recipe.totalDaily}</p><p>${nom.recipe.totalNutrients}</p></span></div></li>`));
                console.log(data.hits);
            }, )

            //DONE FUNCTION TO RECORD RESPONSE
            .done(function (response) {
                // Log the queryURL;
                console.log(queryURL);
                // Log the resulting object;
                console.log(response);
            });
        };

        //SEPERATING ZOMATO API;
        function searchZomato() {

            //GLOBAL VARIABLES FOR GEOLOCATION
            var lat;
            var long;
            var latitude;
            var longitude;
            var coords;
            var position;
            //GEOLOCATION HTML API PULL;
            function getLocation() {
                if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            };
            };
            function showPosition(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                console.log(position.coords);
                console.log(long);
                console.log(position); 

                //HEALTH RESTRICTION FUNCTION;

                //HEALTH DEFICIENCES FUNCTION;

                //GLOBAL VARIABLES;

                //HEALTH INPUT FUNCTION (VEGATARIAN, VEGAN, OMNIVORE);

                //queryURL creation;
                var queryURL = "https://developers.zomato.com/api/v2.1/search?" + "lat=" + lat + "&lon=" + long + "&sort=real_distance&order=asc"; 
                console.log(queryURL);
                //AJAX Pull;
                $.ajax({
                    type: "GET",
                    headers: {
                        'X-Zomato-API-Key': 'c7395f5b6224146e27ac3b2feb756dd7'
                    },
                    url: queryURL,
                    dataType: 'json',
                    processData: true,
                    success: function (data) {
                        console.log(data);
                    }
                });
            };
            getLocation();
        };
    searchRecipe();
    searchZomato();
    //METHODS
    //TEST FUNCTION
    //$(".submit-btn").on("click", function (event) {
        //RUN FUNCTIONS
        // eventSubmit();
        // searchZomato();
        // searchRecipe();
        //CREATES RESULT PAGE BASED ON PARAMATERS
    //}) 
});

$("#clear-all").on("click", function() {
    articleCounter = 0;
    $("#well-section").empty();
  });