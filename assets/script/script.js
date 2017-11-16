//JQUERY INTRODUCTION
// Test code for the functioning of the Server;
$(document).ready(function () {
    //MATERIALIZE FUNCTIONS
    $('select').material_select();


        //SEPEARTING EDAMAM API FUNCTION
        function searchRecipe() {
            //GLOBAL EDAMAM VARIABLES;
            //var apiNutKey = "3413a3675f84f8490cefcc722d559d39";
            //var apiNutID = "be4b8311";
            
            //EDAMAM KEYS;
            var apiRecKey = "e8b036bdd9a6347775ea2c30690c2d94";
            var apiRecID = "7cd61c30";

            //SEARCH INPUT;
            var searchFood = $("#search-bar").val().trim();

            //INDEX DISPLAY TOTAL = 20;
            var fromIndex = 0;
            var toIndex = 20;

            //CALORIE INPUT;
            var caloriesMin = "gte%0";
            var caloriesMax = "lte%20722";
            
            //HEALTH INPUT FUNCTION (VEGATARIAN, VEGAN, OMNIVORE);
            var health = $('input:radio[name="classification"]:checked').val();
            console.log(health);
            
            //HEALTH RESTRICTION FUNCTION
            var restrictions = $(".restrictions").val();
            console.log(restrictions);
            //HEALTH DEFICIENCES FUNCTION
            var diet = $(".diet").val();
            console.log(diet);

            // if $(".active").option.val(); = ; {
            //     function 
            // }

                //Pseudocode section taking the option button
                //Grab the value of the option in the drop down menu
                //Problem: Materialize uses a different scheme to upload the value, it seperates them into an unordered list without the value in the html(??)
                //somehow If ($("select").val.trim)
                //append to queryURL

            //JSONP CALLBACK FUNCTION
            var callback = "?";

            //queryURL creation
            var queryURL = "https://api.edamam.com/search?q=" + searchFood + "&app_id=" + apiRecID + "&app_key=" + apiRecKey + "&from=" + fromIndex + "&to=" + toIndex + "&calories=" + caloriesMin + ",%20" + caloriesMax + "&health=" + health + restrictions + "&callback=food";
            console.log(queryURL);
            // AJAX Pull
            $.ajax({
                    url: queryURL,
                    method: "GET",
                    jsonpCallback: "food",
                    dataType: "jsonp",
                }, )
            //DISPLAY DATA
            .then(data => {
                data.hits.forEach(result => $('.recResults').append(`<li><div class="collapsible-header"><i class="material-icons">arrow_drop_down_circle</i><p>${result.recipe.label}</p></div><div class="collapsible-body"><span><a href="${result.recipe.url}"><img src=${result.recipe.image}></a><p>Source: ${result.recipe.source}</p><p>Link to recipe: <a href=${result.recipe.url}>${result.recipe.label}</a></p><p>Health concerns: ${result.recipe.healthLabels.join(', ')}</p><p>Diet concerns: ${result.recipe.dietLabels.join(', ')}</p><p>Ingredients: ${result.recipe.ingredientLines.join(', ')}<p>Total calories: ${result.recipe.calories}</p></span></div></li>`));
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

        //SEPERATING ZOMATO API FUNCTION;
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

                //SEARCH FUNCTION
                var searchFood = $("#search-bar").val().trim();

                //HEALTH RESTRICTION FUNCTION;
                var health = $('input:radio[name="classification"]:checked').val();
                //HEALTH DEFICIENCES FUNCTION;

                //GLOBAL VARIABLES;

                //HEALTH INPUT FUNCTION (VEGATARIAN, VEGAN, OMNIVORE);

                //queryURL creation;
                var queryURL = "https://developers.zomato.com/api/v2.1/search?" + "q=" + searchFood + "%20" + health + "&lat=" + lat + "&lon=" + long + "&sort=real_distance&order=asc"; 
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
                })
                .then(data => {
                    data.restaurants.forEach(results => $('.resResults').append(`<li><div class="collapsible-header"><i class="material-icons">arrow_drop_down_circle</i><p>${results.restaurant.name}</p></div><div class="collapsible-body"><span><p>Link to website & menu: <a href=${results.restaurant.url}>${results.restaurant.name}</a><p>Address: ${results.restaurant.location.address} ${results.restaurant.location.city} ${results.restaurant.location.zipcode}</p><p>Info: ${results.restaurant.cuisines}; Rating: ${results.restaurant.user_rating.aggregate_rating} </p></span></div></li>`));
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
            getLocation();
        };
        //RUN SEARCH METHODS
    $("#run-search").on("click",function() {
    event.preventDefault();
    searchRecipe();
    searchZomato();
    });
        //CLEAR BUTTONS
    $("#clear-all").on("click", function() {
        $("#search-bar").val().trim() == ("");
        $(".restrictions").removeAttr("active");
        $(".diet").remove("active");
        $(".recResults").val().trim() == ("");
        $(".resResults").val().trim() == ("");

        console.log("#search-bar");
        return false;
    })
});
