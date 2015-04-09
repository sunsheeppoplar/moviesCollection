var express = require("express");
var app = express();
var ejs = require("ejs")
app.set("view_engine", "ejs")
var override = require("method-override");
app.use(override("_method"));
var request = require("request");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
	extended: false
}));
var fs = require("fs");


var counter = 0;

// object to hold all movie objects
var allMovies = {};


var port = 3000;
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


var sample = new Movie("random", 2015, "R", " director: us", ["them", "them2", "them3"], "in a world of code...", "http://img2.wikia.nocookie.net/__cb20121110171617/muppet/images/c/c1/MuppetsOfSesameStreet.jpg");
var movies = {
	0: sample
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
	var term = req.body.title;
	if (term === undefined) {
		res.render("search.ejs");
	} else {
		res.redirect("/results" + term)
	}
});

app.get("/results?:term", function(req, res) {
	var omdbString = "http://omdbapi.com/?t=" + req.query.title + "&y=&plot=shorts&r=json";
	request(omdbString, function(error, response, body) {

		var parsedOMDB = JSON.parse(body)

		res.render("results.ejs", {
			parsedOMDB:omdb
		});
	});
});

// app.get("/search", function(req, res) {
//   var query = "http://www.omdbapi.com/?t=" + req.body.title + "&y=&plot=short&r=json";
//   console.log(req)
//   request(query, function(err, titleres, titlebod) {

//     var omdb = JSON.parse(titlebod);
//     console.log(omdb);
//     query["result"] = omdb;

//   });
//   res.redirect("/search/results");
// });


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