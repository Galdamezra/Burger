var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

//server static content for the app from the "public" directory
//in the application directory
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({
  extended: false
}));

//override with POST having ? method=DELETE
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//directory controllers --> burgers_controller.js
var routes = require("./controllers/burgers_controller.js");
app.use("/", routes);

var port = 3000;
app.listen(port);
