require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var request = process.argv[2];
var item = process.argv.slice(3).join(" ");

switch (request) {
  case "concert-this":
    getArtist(item);

    break;

  default:
    break;
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
