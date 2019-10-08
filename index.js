const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const express = require('express');
const morgan = require('morgan');
const uuid = require("uuid");

const validator = require('express-validator');

var cors = require('cors')
var app = express()
app.use(cors())


const passport = require ('passport');
require('./passport');

// app.use(validator());


// const app = express();
app.use(express.static('public'));
app.use(morgan('common'));
mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

// fixing the node server issue dependencies 
// https://stackoverflow.com/questions/46291571/passport-js-cannot-read-property-username-of-undefined-node
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//importing auth.js file
var auth = require('./auth')(app);

//ALL movies
app.get('/movies', passport.authenticate('jwt',{ session: false}), function(req, res) {
  Movies.find()
  .then(function(movies){
    res.status(201).json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//Gets the data about a single movie by title
app.get('/movies/:Title', passport.authenticate('jwt',{ session: false}), function(req, res){
  Movies.findOne({Title : req.params.Title})
  .then(function(movies){
    res.json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//Get the genre of a single movie based on its title
app.get('/movies/genres/:Title', passport.authenticate('jwt',{ session: false}), function(req, res) {
  Movies.findOne({Title: req.params.Title})
  .then(function(movie){
    if(movie){
      res.status(201).send("Movie with the title : " + movie.Title + " is  a " + movie.Genre.Name + " ." );
    }else{
      res.status(404).send("Movie with the title : " + req.params.Title + " was not found.");
        }
    })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//Gets the data about a director by name
app.get('/movies/directors/:Name', passport.authenticate('jwt',{ session: false}), function(req, res) {
  Movies.findOne({"Director.Name" : req.params.Name})
  .then(function(movies){
    res.json(movies.Director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//Creates new user profile
app.post('/users', function(req, res)  {
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric()
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
    var errors = req.validationErrors();
    if (errors) {
      return res.status(422).json({ errors: errors });
    }

  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username }) // Search to see if a user with the requested username already exists
  .then(function(user) {
    if (user) {
      //If the user is found, send a response that it already exists
      return res.status(400).send(req.body.Username + " already exists");
    } else {
      Users
      .create({
        Username : req.body.Username,
        Password: hashedPassword,
        Email : req.body.Email,
        Birthday : req.body.Birthday
      })
      .then(function(user) { res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

//Gets user profile by username
  app.get('/users/:Username', passport.authenticate('jwt',{ session: false}), function(req, res) {
    Users.findOne({Username : req.params.Username})
    .then(function(user){
      res.json(user)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
  });

// Updates user profile
app.put('/users/:Username', passport.authenticate('jwt',{ session: false}), function(req, res) {
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric()
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
    var errors = req.validationErrors();
    if (errors) {
      return res.status(422).json({ errors: errors });
    }

  Users.findOneAndUpdate({Username: req.params.Username},
  {$set:
    {
      Username: req.body.Username,
      Password:req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  {new: true},//ensures updated user profile is returned
  function(err,updatedUser){
    if (err){
      console.error(err);
      res.status(500).send("Error:" + err);
    }else{
      res.json(updatedUser)
    }
  });
});

// Adds movie to the users list of favourites
app.post('/users/:Username/Favourites/:MovieID', passport.authenticate('jwt',{ session: false}), function(req, res){
  Users.findOneAndUpdate({Username: req.params.Username} ,{
    $addToSet  : {Favourites : req.params.MovieID}
  },
  {new: true},
  function(err,updatedUser){
    if (err){
      console.error(err);
      res.status(500).send("Error:" + err);
    }else{
      res.json(updatedUser)
    }
  })
});

// Removes movie from the users list of favourites
  app.delete('/users/:Username/Favourites/:MovieID', passport.authenticate('jwt',{ session: false}), function(req, res){
    Users.findOneAndUpdate ({Username: req.params.Username},{
     $pull : {Favourites : req.params.MovieID}
  },
  {new: true},
  function(err,updatedUser){
    if (err){
      console.error(err);
      res.status(500).send("Error:" + err);
    }else{
      res.json(updatedUser)
    }
  });
});

// Deletes user account by username
  app.delete('/users/:Username', passport.authenticate('jwt',{ session: false}), function(req, res){
    Users.findOneAndRemove ({Username: req.params.Username })
    .then(function(user) {
      if (!user){
        res.status(400).send("Account with the username: " + req.params.Username + " was not found .");
      }else{
        res.status(200).send("Account with the username : " + req.params.Username + " was successfully deleted.");
      }
    })
    .catch(function(err){
      console.error(err.stack);
      res.status(500).send("Error: " + err);
    });
  });

// listen for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});