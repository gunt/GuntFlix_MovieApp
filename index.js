const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const uuid = require("uuid");
const mongoose = require('mongoose');
const Models = require('./model.js');
const Movies = Models.Movie;
const Users = Models.User;
const passport = require('passport');
const cors = require('cors');
const {
  check,
  validationResult
} = require('express-validator');
require('./passport');

//local database connection
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Fixing Mongoose Error DeprecationWarning: current Server Discovery
//https://github.com/Automattic/mongoose/issues/8156
mongoose.connect('mongodb+srv://MaxOctAdmin:vi82R3s2XP5VLL8G@maxoct-didgb.mongodb.net/myFlixDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static('public'));
// app.use('/client', express.static(path.join(__dirname, 'dist')));
// app.get("/client/*", (_req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());

const auth = require('./auth.js')(app);

// Welcome Message
app.get('/', (_req, res) => {
  res.send('Welcome to myFlixDB');
});

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

// app.get('/directors', function (req, res) {
//   Directors.find()
//     .then(function (directors) {
//       res.status(201).json(users);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// app.get('/users', function (_req, res) {
//   Users.find()
//     .then(function (users) {
//       res.status(201).json(users);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// Registration New User
// Fix code according to documentation Validator
//https://express-validator.github.io/docs/
app.post('/users', [
  check('Username').isAlphanumeric(),
  check('Password').isLength({
    min: 5
  }),
  check('Email').normalizeEmail().isEmail()
], (req, res) => {

  // check validation object for errors
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(422).json({
      errors: errors.array
    });
  }

  var hashedPassword = Users.hashPassword(req.body.Password);

  Users.findOne({
      Username: req.body.Username
    }) //Search to see if a user with requested username already exists
    .then(function (user) {
      if (user) {
        // If the user is found, send a response that is already exists
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then(function (user) {
            res.status(201).json(user)
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    }).catch(function (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// get specific user by username 
app.get('/users/:Username', function (req, res) {
  Users.findOne({
      Username: req.params.Username
    })
    .then(function (user) {
      res.json(user)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// get all the users to figure it out the error null in get specific username
app.get('/users', function (_req, res) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


//Update Username
app.put('/users/:Username', [

  check('Username').isAlphanumeric(),
  check('Password').isLength({
    min: 5
  }),
  check('Email').normalizeEmail().isEmail()
], (req, res) => {
  // check validation object for errors
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(422).json({
      errors: errors.array
    });
  }

  const hashedPassword = Users.hashPassword(req.body.Password);

  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $set: {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday

      }
    }, {
      new: true
    }, //This line makes sure that the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser)
      }
    })
});

// Add a movie to a user's list of favorites
app.post('/users/:username/movies/:MovieID', function (req, res) {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $push: {
        FavoritesMovies: req.params.MovieID
      }
    }, {
      new: true
    },
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser)
      }
    })
});

// Remove a movie from a user's list of favorites
app.delete('/users/:Username/Movies/:MovieID', function (req, res) {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $pull: {
        FavoritesMovies: req.params.MovieID
      }
    }, {
      new: true
    },
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser)
      }
    })

});

// Delete a User Profile
app.delete('/users/:Username', function (req, res) {
  Users.findOneAndUpdate({
      Username: req.params.Username
    })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found.');
      } else {
        res.status(200).send(req.params.Username + ' was successfully deleted.');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Heroku + node.js error (Web process failed to bind to $PORT within 60 seconds of launch)
// https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
app.listen(process.env.PORT || 5000);