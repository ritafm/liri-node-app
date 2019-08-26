// Using .env to hide keys
require('dotenv').config();

//requirements
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require('axios');
var moment = require('moment');
var request = require("request");

// declare variables
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv[3];
var inputTwo = process.argv[4];

// Switch case to handle incoming commands
switch (command) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spot();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doIt();
        break;

    default:
        console.log("Hello there! Please provide one of the following commands after 'node liri.js' " + "\n" +
            "concert-this <artist name / album name>" + "\n" +
            "spotify-this-song <song title>" + "\n" +
            "movie-this <movie name>" + "\n" +
            "do-what-it-says");
};

// Concert-this function
function concert() {
    // Make a request for a user with a given ID
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // handle success
            // console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                console.log();
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date: " + moment(response.data[i].datetime).format('MMMM Do  YYYY'));
                console.log();
            }
        })
};

// Spotify-this-song function
function spot() {
    if (!input) {
        input = "the sign ace of base";
    };

    spotify.search({
            type: "track",
            query: input
        },
        function (err, data) {

            if (err) throw err;

            var trackInfo = data.tracks.items;
            for (let i = 0; i < 5; i++) {
                var spotifyResults =
                    "Artist: " + trackInfo[i].artists[0].name + "\n" +
                    "Song: " + trackInfo[i].name + "\n" +
                    "Preview URL: " + trackInfo[i].preview_url + "\n" +
                    "Album: " + trackInfo[i].album.name;

                console.log(spotifyResults);
                console.log(" ");
            }
        }
    )
};

// Movie-this function
function movie() {
    if (!input) {
        input = "Mr. Nobody";
    };
    // Make a request for a user with a given ID
    axios.get("https://omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                console.log();
                console.log("Title: " + response.data[i].Title);
                console.log("Release Year: " + response.data[i].Year);
                console.log("Rated: " + response.data[i].Rated);
                console.log("Rotten Tomatoes Rating: " + response.data[i].tomatoRating);
                console.log("Country of Origin: " + response.data[i].Country);
                console.log("Language: " + response.data[i].Language);
                console.log("Plot: " + response.data[i].Plot);
                console.log("Actors: " + response.data[i].Actors);
            }
            // handle success
            console.log(response.data);
        })
};

// do-what-it-says function
function doIt(){
    fs.readFile("random.txt", "utf8", function (err, data){
        data = data.split(",");
        var userInput = data[0];
        var userQuery = data[1];
        console.log("node liri.js " + userInput, userQuery);
    });
}
