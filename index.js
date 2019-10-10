const mongoose = require('mongoose');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const Models = require('./model.js');
const Movies = Models.Movie;
const Users = Models.User;
const cors = require('cors');
// const validator = require('express-validator');

const bcrypt = require('bcrypt');

//local database connection
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect('mongodb+srv://MaxOctAdmin:vi82R3s2XP5VLL8G@maxoct-didgb.mongodb.net/myFlixDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  });





// //online database connection fix
// mongoose.connect('mongodb+srv://MaxOctAdmin:vi82R3s2XP5VLL8G@maxoct-didgb.mongodb.net/myFlixDB?retryWrites=true&w=majority', {
//   useNewUrlParser: true
// });

// fixing the node server issue dependencies 
// https://stackoverflow.com/questions/46291571/passport-js-cannot-read-property-username-of-undefined-node
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors()); // CORS-enabled for all origins
const auth = require('./auth.js')(app);
const passport = require('passport');
require('./passport.js');
// app.use(validator());

// //importing auth.js file
// var auth = require('./auth')(app);

// Incorporating API Endpoints - passport.authenticate('jwt', {session: false})
//READ in Mongoose GET requests - all movies
//app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {

// app.get('/movies', (_req, res) => { // Testing without Passport Authenticate
//   Movies.find()
//     .then(function (movies) {
//       res.status(201).json(movies)
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });


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

const {
  check,
  validationResult
} = require('express-validator');


app.post('/users', [
    // check('Username').not().isEmpty(), // check('Username').isLength({ min: 5 })
    check('Username').isLength({ min: 5 }),
    // check('Password').not().isEmpty(), // check('password').isLength({ min: 5 })
    check('Password').isLength({ min: 5 }),
    check('Email', ).isLength({ min: 5 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors) {
      return res.status(422).json({
        errors: errors
      });
    }
    
    const hashedPassword = users.hashPassword(req.body.Password);
    users.findOne({
        Username: req.body.Username
      })
      .then(user => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists.');
        } else {
          users.create({
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
              res.status(500).send('Error: ' + error);
            });
        }
      }).catch(error => {
        console.error(error);
        res.status(500).send('Error: ' + error);
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

  }).listen(process.env.PORT || 5000);

    
