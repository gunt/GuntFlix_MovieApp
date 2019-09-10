//Importing express
const express = require('express');

//Importing morgan middleware
const morgan = require('morgan');

const app = express();


//JSON object containing data about your top 10 movies.
//movies, directors, and genres.
let topTenMovies = [{
    title: 'The Passion of the Christ (2004)',
    director: 'Mel Gibson',
    genres: 'Drama',
  },
  {
    title: 'Hackers (1995)',
    director: 'Iain Softley',
    genres: 'Comedy, Crime, Drama',
  },
  {
    title: 'The Social Network (2010)',
    director: 'David Fincher',
    genres: 'Biography, Drama ',
  },
  {
    title: 'TPB AFK: The Pirate Bay Away from Keyboard (2013)',
    director: 'Simon Klose',
    genres: 'Documentary ',
  },
  {
    title: 'The Matrix (1999)',
    director: 'Lana Wachowski',
    genres: 'Action, Sci-Fi ',
  },
  {
    title: 'The Godfather (1972)',
    director: 'Francis Ford Coppola',
    genres: 'Crime, Drama',
  },
  {
    title: 'Gladiator (2000)',
    director: 'Ridley Scott',
    genres: ' Action, Adventure, Drama',
  },
  {
    title: 'Raiders of the Lost Ark (1981)',
    director: 'Steven Spielberg',
    genres: 'Action, Adventure ',
  },
  {
    title: 'The Dark Knight (2008)',
    director: 'Christopher Nolan',
    genres: 'Action, Crime, Drama ',
  },
  {
    title: 'War Room (2015)',
    director: 'Alex Kendrick',
    genres: 'Drama',
  }
]

// This function automatically routes all requests for static files // documentation
app.use(express.static('public'));

//Morgan middleware library to log all requests
app.use(morgan('common'));


//GET requests //The _-prefix is a way to opt-out of this feature.
app.get('/movies', function(_req, res) {
  res.json(topTenMovies)
});

app.get('/', function(_req, res) {
  res.send('Welcome to GuntFlix movie app!')
});

//error-handling middleware function
app.use(function(err, _req, res, _next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
