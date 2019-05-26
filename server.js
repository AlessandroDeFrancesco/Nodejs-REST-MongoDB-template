"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var GAMES_COLLECTION = "games";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server. 
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// GAMES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/games"
 *    GET: finds all games
 *    POST: creates a new game
 */

app.get("/games", function(req, res) {
  db.collection(GAMES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get games.");
    } else {
      res.status(200).json(docs);  
    }
  });
});

app.post("/games", function(req, res) {
  if (!(req.body.name)) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
    return;
  }

  var newGame ={
    name: req.body.name,
    createDate: new Date()
  };

  db.collection(GAMES_COLLECTION).insertOne(newGame, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new game.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/games/:id"
 *    GET: find game by id
 *    PUT: update game by id
 *    DELETE: deletes game by id
 */

app.get("/games/:id", function(req, res) {
  db.collection(GAMES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get game");
    } else {
      res.status(200).json(doc);  
    }
  });
});

app.put("/games/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(GAMES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update game");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/games/:id", function(req, res) {
  db.collection(GAMES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete game");
    } else {
      res.status(204).end();
    }
  });
});