//integrate Mongoose into your REST API, which will allow your REST API to perform CRUD operation on your MongoDB data
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//This allows Mongoose to connect to that database myFlixDB
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true
});

// //Importing express
const express = require('express');

// //Importing body-parser & uuid
//bodyParser = require("body-parser");
//const uuid = require("uuid");
const app = express();

// fixing the node server issue dependencies 
// https://stackoverflow.com/questions/46291571/passport-js-cannot-read-property-username-of-undefined-node
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
}));

// //Importing morgan middleware
// const morgan = require('morgan');

// This function automatically routes all requests for static files // documentation
app.use(express.static('public'));

// //Morgan middleware library to log all requests
// app.use(morgan('common'));


//READ in Mongoose GET requests - all movies
app.get('/movies', function (_req, res) {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Gets the data about a single movie by Title (Documentation)
app.get('/movies/:Title', function (req, res) {
  Movies.findOne({
      Title: req.params.Title
    })
    .then(function (movies) {
      res.json(movies)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get data data about a movie by Genre_Title (description) // /movies/genres/[Title]
app.get('/movies/genres/:Title', function (req, res) {
  Movies.findOne({
      Title: req.params.Title
    })
    .then(function (movie) {
      if (movie) {
        res.status(201).send("The Genre of the Movie : " + movie.Title + " is " + movie.Genre.Name);
      } else {
        res.status(204).send(movie.Title + " is not available");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get data about a director by name // /movies/directors/[name]
app.get('/movies/directors/:Name', function (req, res) {
  Movies.findOne({
      "Director.Name": req.params.Name
    })
    .then(function (movies) {
      res.json(movies.Director)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Create a new User Moongose
app.post('/users', (req, res) => {
  Users.findOne({Username: req.body.Username})
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists.");
      } else {
        Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then(user => {
            res.status(201).json(user)
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error: " + error);
          })
      }
    }).catch(error => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Update Username
app.put('/users/:Username', function (req, res) {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    }, {
      new: true
    }, // This line makes sure that the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', function (req, res) {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $push: {
        FavoriteMovies: req.params.MovieID
      }
    }, {
      new: true
    }, // This line makes sure that the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

// Remove a movie to a user's list of favorites
app.delete('/users/:Username/Movies/:MovieID', function (req, res) {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $pull: {
        FavoriteMovies: req.params.MovieID
      }
    }, {
      new: true
    }, // This line makes sure that the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

// Delete a user by username
app.delete('/users/:Username', function (req, res) {
  Users.findOneAndRemove({
      Username: req.params.Username
    })
    .then(function (user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
