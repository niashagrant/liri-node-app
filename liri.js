require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var request = process.argv[2];
var itemSearch = process.argv.slice(3).join(" ");

function runLiri(request, itemSearch) {
  switch (request) {
    case "concert-this":
      getArtist(itemSearch);

      break;

    case "spotify-this-song":
      getSong(itemSearch);

      break;

    case "movie-this":
      getMovie(itemSearch);

      break;

    case "do-what-it-says":
      getWhatItSays(itemSearch);

      break;

    default:
      break;
  }
}

function getArtist(artist) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function (response) {
      console.log("Artist Name : " + artist);
      console.log("Venue Name : " + response.data[0].venue.name);
      console.log("Venue location: " + response.data[0].venue.city);

      var concertDate = moment(response.data[0].datetime).format("LLLL");
      console.log("Event Date : " + concertDate);
    })
    .catch(function (error) {
      console.log("Sorry, not a proper search");
      console.log(error);
    });
}

function getSong(song) {
  var spotify = new Spotify(keys.spotify);

  if (song === "") {
    song = "The Sign";
  }

  spotify.search({ type: "track", query: song }, function (error, data) {
    if (error) {
      console.log("Error: " + error);
    }

    console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Preview Link of Song: " + data.tracks.items[0].href);
    console.log("Album: " + data.tracks.items[0].album.name);
  });
}

function getMovie(movie) {
  axios
    .get(
      "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=d0614c94"
    )
    .then(function (response) {
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    });
}

function getWhatItSays(says) {}

runLiri(request, itemSearch);
