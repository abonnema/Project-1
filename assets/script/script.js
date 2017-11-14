// Test code for the functioning of the Server;

$(document).ready(function() {

    $('select').material_select();
    // Trying to interperet JSONP response;
    function jsonCallback(json) {
        console.log(json);
    }

    function logResults(json) {
        console.log(json);
    }

    //Build queryURL based on variables selected from menus which will replace the healthLabel function; 
    //Figure out how to combine multiple API's;
    function searchRecipe(searchFood) {

        // API Keys, ID, and variables for Nutrition Analysis;
        var APINutKey = "3413a3675f84f8490cefcc722d559d39";
        var APINutID = "be4b8311";
        var searchFood = $("input").eq(0).val();
        var dummySearch = "banana";
        // API Keys, ID, and variables for Recipes based on drop-down paramaters;
        var APIRecKey = "e8b036bdd9a6347775ea2c30690c2d94";
        var APIRecID = "7cd61c30";
        var fromIndex = 0;
        var toIndex = 10;
        var caloriesMin = "gte%0";
        var caloriesMax = "lte%20722";
        var callback = "?";
        var health = "vegan"; // KEY! Vegetarian,  vegan, etc...;
        //queryURL creation; The callback function allows for the jsonp data type to bypass the problem of no CORS implementation;
        var queryURL = "https://api.edamam.com/search?q=" + dummySearch + "&app_id=" + APIRecID + "&app_key=" + APIRecKey + "&from="+ fromIndex + "&to=" + toIndex + "&calories=" + caloriesMin + ",%20" + caloriesMax + "&health=" + health + "&callback=food";
        console.log(queryURL);
        // AJAX Pull;
        $.ajax({
            url: queryURL,
            method: "GET",
            jsonpCallback: "food",
            dataType: "jsonp",
        },
        )

        .then(data => {
            console.log(data.hits);
            data.hits.forEach(nom => $('.intro').append(`<p>${nom.recipe.label}</p>`));
        },
        )

        .done(function(response) {
            // Log the queryURL;
            console.log(queryURL);
            // Log the resulting object;
            console.log(response);
        });
    };

    function searchGooglePlaces(searchMap) {
        //Places Libraries
        var map;
        var service;
        var infowindow;
        
        function initialize() {
          var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
        
          map = new google.maps.Map(document.getElementById('map'), {
              center: pyrmont,
              zoom: 15
            });
        
          var request = {
            location: pyrmont,
            radius: '500',
            query: 'restaurant'
          };
          
          service = new google.maps.places.PlacesService(map);
          service.textSearch(request, callback);
        }
        
        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              createMarker(results[i]);
            }
          }
        };
        console.log(results);    
        
    }; 
    function searchZomato(searchRest) {
        $.ajax({
            type: "GET", 
            headers: {
            'X-Zomato-API-Key': 'c7395f5b6224146e27ac3b2feb756dd7' //non-standard header as researched
            },
            url: 'https://developers.zomato.com/api/v2.1/dailymenu', 
            dataType: 'json', 
            data: {
            //could be directly in URL, but this is more pretty, clear and easier to edit
            res_id: 'YOUR_RESTAURANT_OR_PLACE_ID',
            },
            processData: true, //data is an object => tells jQuery to construct URL params from it
            success: function(data) {
            console.log(data); //logging response data
            }
        });
    }
    searchZomato();
    searchRecipe();
    searchGooglePlaces();
})