//integrate Mongoose into your REST API, which will allow your REST API to perform CRUD operation on your MongoDB data
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const passport = require('passport');
require('./passport');

const cors = require('cors');
app.use(cors());

// //Importing express
const express = require('express');
const app = express();

// const { check, validationResult } = require('express-validator');
const validator = require('express-validator');

//This allows Mongoose to connect to that database myFlixDB
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true
});


// >>> only certain origins to be given access <<<
// var allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

// app.use(cors({
//   origin: function(origin, callback){
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//       var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//       return callback(new Error(message ), false);
//     }
//     return callback(null, true);
//   }
// }));



// fixing the node server issue dependencies 
// https://stackoverflow.com/questions/46291571/passport-js-cannot-read-property-username-of-undefined-node
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// import your auth.js
var auth = require('./auth')(app);

// This function automatically routes all requests for static files // documentation
app.use(express.static('public'));


// Incorporating API Endpoints - passport.authenticate('jwt', {session: false})
//READ in Mongoose GET requests - all movies
app.get('/movies', passport.authenticate('jwt', {
  session: false
}), function (_req, res) {
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
app.get('/movies/:Title', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
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
app.get('/movies/genres/:Title', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
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
app.get('/movies/directors/:Name', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
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

// Registration New User
app.post('/users', (req, res) => {
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric()
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();


  // check the validation object for errors // error handling function
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({
      Username: req.body.Username
    })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists.");
      } else {
        Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
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
app.put('/users/:Username', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
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
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
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

// Remove a movie from a user's list of favorites
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
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
app.delete('/users/:Username', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
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
