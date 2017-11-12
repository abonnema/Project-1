// Test code for the functioning of the Server

$(document).ready(function() {
    
    
            // Trying to interperet JSONP response
        function jsonCallback(json){
        console.log(json);
        }
        function logResults(json){
            console.log(json);
        }
        
        //Build queryURL based on variables selected from menus which will replace the healthLabel function; 
        //Figure out how to combine multiple API's;
        function searchFunction(searchFood) {
    
            // API Keys, ID, and variables for Nutrition Analysis;
            var APINutKey = "3413a3675f84f8490cefcc722d559d39";
            var APINutID = "be4b8311";
            var search = $("input").eq(0).val();
            var dummySearch = "banana";
            // API Keys, ID, and variables for Recipes based on drop-down paramaters;
            var APIRecKey = "e8b036bdd9a6347775ea2c30690c2d94";
            var APIRecID = "7cd61c30";
            var fromIndex = 0;
            var toIndex = 20;
            var caloriesMin = "gte%1";
            var caloriesMax = "lte%20722";
            var health = "?"; // KEY! Vegetarian,  vegan, etc...;
            var callback = "?";
            //queryURL creation; The callback function allows for the jsonp data type to bypass the problem of no CORS implementation;
            var queryURL = "https://api.edamam.com/search?q=" + dummySearch + "&app_id=" + APIRecID + "&app_key=" + APIRecKey + "&from="+ fromIndex + "&to=" + toIndex + "&calories=" + caloriesMin + ",%20" + caloriesMax + "&health=" + health + "&callback=?";
            console.log(queryURL);
            // AJAX Pull;
            $.ajax({
                url: queryURL,
                method: "GET",
                dataType: "jsonp",
            },
            )
    
    
    
            .done(function(response) {
                // Log the queryURL;
                console.log(queryURL);
                // Log the resulting object;
                console.log(response);
                
            });
        }
        searchFunction();
    })