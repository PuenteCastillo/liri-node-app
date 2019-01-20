require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require('./keys');

var inquirer = require("inquirer");
var fs = require("fs");
var axios = require('axios');



require("dotenv").config();

var CheckSong = function () {
  inquirer
    .prompt([

      {
        type: "input",
        message: "Name of song?",
        name: "songName"
      },

    ]).then(function (resp) {
      var song;
      if (resp.songName) {
        song = resp.songName;

      } else {
        song = "I want it That Way"
      }
     

      var spotify = new Spotify(keys.spotify);

      spotify
        .search({ type: 'track', query: song })
        .then(function (response) {

          var showData = [
            "Name: " + response.tracks.items[9].name,
            "Artist: " + response.tracks.items[9].artists[0].name,
            "Link: " + response.tracks.items[9].href,
            "Abum: " + response.tracks.items[9].album.name,

          ].join('\n');

          console.log('\n\n\n' + showData + '\n\n\n');


        })
        .catch(function (err) {
          console.log(err);
        });

    });
}

var CheckMovie = function () {

  inquirer
    .prompt([

      {
        type: "input",
        message: "Name of Movie?",
        name: "movieName"
      },

    ]).then(function (resp) {
      var myMovie ;
      if (resp.movieName) {
        myMovie = resp.movieName;

      } else {
        myMovie = 'Mr. Nobody';
      }
    

      axios.get(`https://www.omdbapi.com/?t=${myMovie}&y=&plot=short&apikey=trilogy`)
        .then(function (response) {
          var showData = [
            "Title: " + response.data.Title,
            "Year: " + response.data.Year,
            "Rating: " + response.data.Rated,
            "Country: " + response.data.Country,
            "Language: " + response.data.Language,
            "Plot: " + response.data.Plot,
            "Actors: " + response.data.Actors,
            /////////////////////////
          ].join('\n');
          console.log('\n\n\n' + showData + '\n\n\n');
        })
        .catch(function (error) {
          console.log(error);
        });




    });






 

}

var DoSomthing = function(){
 
  fs = require('fs')
  fs.readFile('random.txt', 'utf8', function (err,data) {
    if(err) return console.error(err);
    console.log(data);
  });
 
}

// https://www.newstatesman.com/sites/default/files/styles/nodeimage/public/blogs_2014/07/2014_28film.jpg?itok=7itzRGCl

var start = function () {
  inquirer
    .prompt([

      {
        type: "list",
        message: "What are you Searching For?",
        choices: ["Song", "Movie", "do-what-it-says"],
        name: "Select"
      },

    ]).then(function (inquirerResponse) {
      if (inquirerResponse.Select === "Song") {
        CheckSong();
      } else if (inquirerResponse.Select === "Movie") {
        CheckMovie();
      } else if (inquirerResponse.Select === "do-what-it-says") {
        DoSomthing();
      }

    });
}

start();


