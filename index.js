const path = require("path");
const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
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

// Supabase client is initialized in model.js via supabase.js

app.use(express.static('public'));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("/client/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

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
  Movies.findAll()
    .then(function (movies) {
      res.status(201).json(movies)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Gets the data about a single movie by Title
app.get('/movies/:Title', function (req, res) {
  Movies.findByTitle(req.params.Title)
    .then(function (movies) {
      if (!movies) return res.status(404).json({ error: "Movie not found" });
      res.json(movies)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get('/genres/:Name', function (req, res) {
  Movies.findByGenreName(req.params.Name)
    .then(obj => {
      if (!obj) return res.status(404).json({ error: "Genre not found" });
      // Return genre info in original format
      res.json({ Name: obj.genre_name, Description: obj.genre_description });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
});

// Get data about a movie by Genre_Title (description) // /movies/genres/[Title]
app.get('/movies/genres/:Title', function (req, res) {
  Movies.findByTitle(req.params.Title)
    .then(function (movie) {
    if (movie) {
        res.status(201).send("The Genre of the Movie : " + movie.title + " is " + movie.genre_name);
      } else {
        res.status(204).send(movie?.title || req.params.Title + " is not available");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get data about a director by name // /movies/directors/[name]
app.get('/movies/directors/:Name', function (req, res) {
  Movies.findByDirectorName(req.params.Name)
    .then(function (movie) {
      if (!movie || !movie.director_name) return res.status(404).json({ error: "Director not found" });
      res.json({ Name: movie.director_name, Bio: movie.director_bio });
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get('/directors', async function (_req, res) {
  try {
    const directors = await Movies.findAllDirectors();
    res.json(directors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err.message);
  }
});

app.get('/directors/:Name', function (req, res) {
  Movies.findByDirectorName(req.params.Name)
    .then(item => {
      if (!item || !item.director_name) return res.status(404).json({ error: "Director not found" });
      res.json({ Name: item.director_name, Bio: item.director_bio });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Registration New User
app.post('/users', [
  check('Username').isAlphanumeric(),
  check('Password').isLength({
    min: 5
  }),
  check('Email').normalizeEmail().isEmail()
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  Users.create({
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  })
    .then(function (user) {
      res.status(201).json(user)
    })
    .catch(function (error) {
      if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
        return res.status(409).send(req.body.Username + ' already exists');
      }
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// get specific user by username 
app.get('/users/:Username', function (req, res) {
  Users.findOne({ Username: req.params.Username })
    .then(function (user) {
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// get all the users
app.get('/users', function (_req, res) {
  Users.findAll()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Update Username
app.put('/users/:Username', [
  check('Username').isAlphanumeric(),
  check('Password').isLength({
    min: 5
  }),
  check('Email').normalizeEmail().isEmail()
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  Users.updateByUsername(req.params.Username, {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  })
    .then(function (updatedUser) {
      res.json(updatedUser);
    })
    .catch(function (error) {
      if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
        return res.status(409).send(req.body.Username + ' already exists');
      }
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', function (req, res) {
  Users.addFavoriteMovie(req.params.Username, req.params.MovieID)
    .then(function (updatedUser) {
      res.json(updatedUser);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Remove a movie from a user's list of favorites
app.delete('/users/:Username/FavoriteMovies/:MovieID', function (req, res) {
  Users.removeFavoriteMovie(req.params.Username, req.params.MovieID)
    .then(function (updatedUser) {
      res.json(updatedUser);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Delete a User Profile
app.delete('/users/:Username', function (req, res) {
  Users.deleteByUsername(req.params.Username)
    .then(function () {
      res.status(200).send(req.params.Username + ' was successfully deleted.');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
