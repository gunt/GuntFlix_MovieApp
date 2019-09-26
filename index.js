//integrate Mongoose into your REST API, which will allow your REST API to perform CRUD operation on your MongoDB data
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//This allows Mongoose to connect to that database myFlixDB
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true
});

//Importing express
const express = require('express');

//Importing body-parser & uuid
bodyParser = require("body-parser"),
  uuid = require("uuid");
const app = express();

//Importing morgan middleware
const morgan = require('morgan');

// This function automatically routes all requests for static files // documentation
app.use(express.static('public'));

//Morgan middleware library to log all requests
app.use(morgan('common'));


//READ in Mongoose GET requests - all movies
app.get('/movies', function (req, res) {
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
        res.status(201).send(movie.Title + " is a " + movie.Genre.Name);
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
app.get("/movies/director/:name", (req, res) => {
  res.send('Returning data about director by name successfully.');
});

//Get data about a director by name // /movies/directors/[name]
app.get('/movies/director/:Name', function (req, res) {
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
app.post('/users', function (req, res) {
  Users.findOne({
      Username: req.body.Username
    })
    .then(function (user) {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists.");
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then(function (user) {
            res.status(201).json(user)
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).send("Error: " + error);
          })
      }
    }).catch(function (error) {
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
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoritesMovies : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

//Remove a movie from user's favorites list // /favorites/[username]/[title]
app.delete("/favorites/:username/:title", (req, res) => {
  res.send('Movie deleted from favorite list successfully.');
});


// Delete a user by username
app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});





//Allow existing users to deregister // /users/[username]
app.delete("/users/:username", (req, res) => {
  res.send('User delete from registry successfully.');
});

//error-handling middleware function
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
