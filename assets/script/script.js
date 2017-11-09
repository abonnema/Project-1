$(document).ready(function() {
    //Build queryURL based on variables selected from menus which will replace the healthLabel function; 
    //Figure out how to combine multiple API's
    function searchFunction(searchFood) {
        // API Keys, ID, and variables for Nutrition Analysis
        var APINutKey = "3413a3675f84f8490cefcc722d559d39";
        var APINutID = "be4b8311";

        var search = $("input").eq(0).val();
        var dummySearch = "banana"
        // API Keys, ID, and variables for Recipes based on drop-down paramaters
        var APIRecKey = "c0c661eed19934a4aa120f6534a56b27";
        var APIRecID = "8e20c1ec";
        var fromIndex = 1;
        var toIndex = 20;
        var caloriesMin = "gte%1";
        var caloriesMax = "lte%20722";
        var healthLabel = "";
        //queryURL creation
        var queryURL = "https://api.edamam.com/search?q=" + dummySearch + "&app_id=$" + APIRecID + "&app_key=$" + APIRecKey + "&from="+ fromIndex + "&to=" + toIndex + "&calories=" + caloriesMin + ",%20" + caloriesMax + "&health=" + healthLabel;
        console.log(queryURL);
        
        // AJAX Pull 
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            // Log the queryURL
            console.log(queryURL);
            // Log the resulting object
            console.log(response);
            
        });
    }
    searchFunction();
    callback
})