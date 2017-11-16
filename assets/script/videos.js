var vidWidth = 700;
var vidHeight = 700;
var vidResults = 10;



function search() {

    q = $("#search-term").val();

    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems", {
            part: "snippet, id",
            q: q,
            type: "video",
            maxResults: vidResults,
            key: "AIzaSyDpB-cEkF8ULiV-u0dpJj7C271FeYdoV0k"
        },
        function (response) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(response);

            $.each(response.items, function (i, item) {

                var result = getResults(item);
                vidTitle = item.snippet.title;
                videoId = item.snippet.resourceId.videoId;
                result = '<li><iframe height="' + vidHeight + '" width="' + vidWidth + '" src=\"//www.youtube.com/embed/' + videoId + '\"></iframe></li>';

                //Append to page
                $("#results").append(result);
            })
        }
    );
    $("#run-search").submit(function (event) {

        event.preventDefault();
    })
}

// function getVids



$("#clear-all").click(function () {
    $("#results").empty();
})