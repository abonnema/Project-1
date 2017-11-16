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
        }).done(function (Data) {

            // Logging the URL so we have access to it for troubleshooting
            console.log("------------------------------------");
            console.log("URL: " + queryURL);
            console.log("------------------------------------");

            // Log the NYTData to console, where it will show up as an object
            console.log(Data);
            console.log("------------------------------------");

            // Loop through and provide the correct number of articles
            for (var i = 0; i < numArticles; i++) {

                // Adding to the article counter

                // Creating the HTML
                var wellSection = $("<div>");
                wellSection.addClass("well");
                wellSection.attr("id", "article-well" + articleCounter);
                $("#well-section").append(wellSection);

                // Append to HTML
                $("#articleWell-" + articleCounter)
                    .append("<a href='" + Data.response.articles[i].urlToImage + "'>" +
                        Data.response.articles[i].urlToImage + "</a>"
                    );
                $("#articleWell-" + articleCounter)
                    .append("<h5>Title: " + Data.response.articles[i].title);
                $("#articleWell-" + articleCounter)
                    .append("<h5>Author: " + Data.response.articles[i].author);
                $("#articleWell-" + articleCounter)
                    .append("<a href='" + Data.response.articles[i].url + "'>" +
                        Data.response.articles[i].url + "</a>"
                    );

                // Log the fields to console
                console.log(Data.response.articles[i].urlToImage);
                console.log(Data.response.articles[i].title);
                console.log(Data.response.articles[i].author);
                console.log(Data.response.articles[i].url);
            }
        })
    }
})