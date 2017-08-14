//create all functions that will do routing for app

var express = require("express");
var router = express.Router();
var burger = require("../models/burgers.js");

// router.get("/", function (req, res) {
//   res.redirect("/burgers");
// });

router.get("/", function (req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function (req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function () {
    res.redirect("/");
  });
});

router.put("/burgers/update/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    sleepy: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});


module.exports = router;
