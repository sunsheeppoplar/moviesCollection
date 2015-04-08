var express = require("express");
var app = express();

var ejs = require("ejs")
app.set("view_engine", "ejs")

var override = require("method-override");
app.use(override("_method"));

var request = require("request");

var fs = require("fs");

var query = {};
var counting=0;

function delay(func){
  if(query==={}){
    console.log("hi"+counting);
    setTimeout(delay, 100);
    counting++;
  }else{
    console.log(query);
    func();
  }
}

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: false
}));

var port = 3000;
var counter = 0;
var Movie = function(title, year, rating, director, actors, plot, poster) {
  this.id = counter;
  counter++;
  this.title = title;
  this.year = year;
  this.rating = rating;
  this.director = director;
  this.actors = actors;
  this.plot = plot;
  this.poster = poster;
};


var sr = new Movie("random", 2015, "R", " director: us", ["them", "them2", "them3"], "in a world of code...", "http://img2.wikia.nocookie.net/__cb20121110171617/muppet/images/c/c1/MuppetsOfSesameStreet.jpg");
var movies = {
  0: sr
};

app.get("/", function(req, res) {
  res.redirect("/movies");
});

app.get("/movies", function(req, res) {
  res.render("index.ejs", {
    movies: movies,
  });
});

app.get("/search", function(req, res) {
  res.render("search.ejs");
});

app.put("/search", function(req, res) {
  var query = "http://www.omdbapi.com/?t=" + req.body.title + "&y=&plot=short&r=json";
  request(query, function(err, titleres, titlebod) {

    var omdb = JSON.parse(titlebod);
    console.log(omdb);
    query["result"] = omdb;

  });
  res.redirect("/search/results");
});
console.log("QUERY RESULT CONSOLE: "+query.Title);
app.get("/search/results", function(req, res) {
  function happen(){ 
    res.render("results.ejs", {
    omdb: query.result,
  });
    console.log(query);
  };

  delay(happen);
});

app.get("/movie/:id", function(req, res) {
  var movie = movies[parseInt(req.params.id, 10)];
  console.log(movie);
  res.render("show.ejs", {
    movie: movie
  });
});

app.delete("/movie/:id", function(req, res) {
  delete movies[parseInt(req.params.id, 10)];
  res.redirect("/movies");
});

app.listen(port, function() {
  console.log("Server is now listening on PORT: " + port);
});