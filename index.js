const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./model.js');
const Movies = Models.Movie;
const Users  = Models.User;
const passport = require('passport');
const cors = require('cors');
const {check, validationResult } = require('express-validator');
require('./passport');

//local database connection
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect('mongodb+srv://MaxOctAdmin:vi82R3s2XP5VLL8G@maxoct-didgb.mongodb.net/myFlixDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  });

  app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());

const auth = require('./auth.js')(app);

app.get('/', (_req, res) => {
  res.send('Welcome to myFlixDB');
});

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

app.post('/Users',[
  // Validation logic here for request
    check('Username').isAlphanumeric(),
    check('Password').isLength({ min: 5}),
    check('Email').normalizeEmail().isEmail()
  ], (req, res) => {
  
    // check validation object for errors
    const errors = validationResult(req);
  
    if (!errors.isEmpty) {
      return res.status(422).json({ errors: errors.array});
    }
    
    var hashedPassword = Users.hashPassword(req.body.Password
      );
    Users.findOne({
      Username : req.body.Username
    }) //Search to see if a user with requested username already exists
    .then(function(user) {
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
        .then(function(user) {res.status(201).json(user)})
        .catch(function(error) {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    }).catch(function(error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
  });

    //Update Username
    app.put('/Users/:Username', passport.authenticate('jwt', { session:false}), [
  
      check('Username').isAlphanumeric(),
      check('Password').isLength({ min: 5}),
      check('Email').normalizeEmail().isEmail()
    ], (req, res) => {
    // check validation object for errors
    const errors = validationResult(req);
  
    if (!errors.isEmpty) {
      return res.status(422).json({ errors: errors.array});
    }
    
  
    var hashedPassword = Users.hashPassword(req.body.Password
      );
  
    Users.findOneAndUpdate({
      Username: req.params.Username
    }, {$set :
        {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
  
        }},
        {new: true}, //This line makes sure that the updated document is returned
        function(err, updatedUser) {
          if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
          } else {
            res.json(updatedUser)
          }
        })
      });

    // Add a movie to a user's list of favorites
    app.post('/Users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session:false}), function (req, res) {
      Users.findOneAndUpdate({Username : req.params.Username},
       {
        $push: {FavoriteMovies: req.params.MovieID}
       },
      {new: true},
      function(err, updatedUser) {
        if (err) { 
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser)
        }
        })
      });

    // Remove a movie from a user's list of favorites
    app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session:false}), function (req, res) {
      Users.findOneAndUpdate({Username: req.params.Username}, {
        $pull: {FavoriteMovies: req.params.MovieID}
      },
      {new: true},
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser)
        }
      })
     
    });

    // Delete a user by username
    app.delete('/Users/:Username', passport.authenticate('jwt', { session:false}), function (req, res) {
  Users.findOneAndUpdate({Username: req.params.Username})
  .then(user => {
    if(!user) {
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

app.listen(process.env.PORT || 5000);

  