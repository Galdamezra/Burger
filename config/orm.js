//Wirte functions that take inputs and conditions

var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
  //column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }
  return arr.toString();
}

var orm = {
  all: function (tableInput, bb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      bb(result);
    });
  },
  //vals is an array of values that we want to save to cols
  //cols are the columns we want to insert the values into
  create: function (table, cols, vals, bb) {
    var queryString = "INSERT INTO " + table;

    queryString = queryString + " (";
    queryString = queryString + cols.toString();
    queryString = queryString + ") ";
    queryString = queryString + "VALUES (";
    queryString = queryString + printQuestionMarks(vals.length);
    queryString = queryString + ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;
      bb(result);
    });
  },
  //objColVals would be the colunns and values that you want to update
  //an example of objColVals would be {burger_name: Lettuce lettuce, devoured: true}
  update: function (table, objColVals, condition, bb) {
    var queryString = "UPDATE" + table;

    queryString = queryString + " SET ";
    queryString = queryString + objColVals(objColVals);
    queryString = queryString + " WHERE ";
    queryString = queryString + condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      bb(result)
    });
  },
  delete: function(table, condition, bb) {
    var queryString = "DELETE FROM " + table;

    queryString = queryString + " WHERE ";
    queryString = queryString + condition;

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      bb(result)
    });
  }
};

module.exports = orm;