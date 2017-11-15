// Global Variables
// ================================================================

// Authorization Key
var authKey = "821e7830f382482297ad4c0ddd6dd731";

// These will hold the results we get from the user input
var searchWord = "";
var source = $(".source").val();
var numResults = 0;
var startYear = 0;
var endYear = 0;

// API endpoint
// searchWord will be appended when user searches
var queryURLBase = "https://newsapi.org/v1/articles?source=" + source + "&sortBy=top&apiKey=" + authKey + "&q=";

// Counter to keep track of articles

var artCounter = 0;

// FUNCTIONS
// ===============================================================

// runQuery to take in parameters (articles, URL)

$(document).ready(function () {
    $('select').material_select();

    function runQuery(numArticles, queryURL) {


        // AJAX CALL to get JSON data from Google News API
        // Data will get stored in a variable called: "GData"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (GData) {

        })
    }
})