var express = require("express");
var app = express();

var ejs = require("ejs")
app.set("view_engine", "ejs")

var override = require("method-override");
app.use(override("_method"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: false
}));

var port = 3000;

var Movie = function(title, year, rating, director, actors, plot, poster) {
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
app.get("/movie/:id", function(req, res) {
  var movie = movies[parseInt(req.params.id, 10)];
  console.log(movie);
  res.render("show.ejs", {
    movie: movie
  });
});


app.delete("/movie/:id", function(req, res) {
  delete movies[parseInt(req.parms.id, 10)];
  res.redirect("/movies");
  })

app.listen(port, function() {
  console.log("Server is now listening on PORT: " + port);
});