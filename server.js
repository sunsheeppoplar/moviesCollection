var express = require("express");
var app = express();

var ejs = require("ejs")
app.set("view_engine", "ejs")

var override = require("method-override");
app.use(overrride("_method"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended:false
  }));

var port = 3000;

var Movie = function(title, year, rating, director, actors, plot, poster) {

}