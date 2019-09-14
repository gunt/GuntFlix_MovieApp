//Importing express
const express = require('express');

//Importing body-parser & uuid
bodyParser = require("body-parser"),
  uuid = require("uuid");
const app = express();


app.use(bodyParser.json());


//Importing morgan middleware
const morgan = require('morgan');

//JSON object containing data about top 10 movies.
//Return data (Movie title, description, genre, director, image URL,  about a single movie by title to the user
//director (bio, birth year, death year) by name
let topTenMovies = [{
    title: 'The Passion of the Christ (2004)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'

  },
  {
    title: 'Hackers (1995)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'
  },
  {
    title: 'The Social Network (2010)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'
  },
  {
    title: 'TPB AFK: The Pirate Bay Away from Keyboard (2013)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'
  },
  {
    title: 'The Matrix (1999)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'
  },
  {
    title: 'The Godfather (1972)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'
  },
  {
    title: 'Gladiator (2000)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'
  },
  {
    title: 'Raiders of the Lost Ark (1981)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'
  },
  {
    title: 'The Dark Knight (2008)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'
  },
  {
    title: 'War Room (2015)',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Drama',
    director: {
      name: 'Mel Gibson',
      bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
      birthYear: '1956'
    },
    imageURL: 'https://www.imdb.com/title/tt0335345/mediaviewer/rm1588566272'
  }
]

// app.get("/students", (req, res) => {
//  res.send(“Successful GET request returning data on all the students”);
// });

// This function automatically routes all requests for static files // documentation
app.use(express.static('public'));

//Morgan middleware library to log all requests
app.use(morgan('common'));


//GET requests - all movies
app.get('/movies', function(req, res) {
  res.json(topTenMovies)
});

// Gets the data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(topTenMovies.find( (movie) =>
    { return movie.title === req.params.title }));
});

// Get data data about a movie by genre (description) // /movies/genres/[genre]
app.get("/movies/genres/:genre", (req, res) => {
  res.json(topTenMovies.find( (movie) =>
    { return movie.genre === req.params.genre }));
});

//Get data about a director by name // /movies/directors/[name]
app.get("/movies/directors/:name", (req, res) => {
  res.send('Successful GET request returning data about director by name');
});

//Create a new User // /users
app.get("/users", (req, res) => {
  res.send('Successful GET request returning data about director by name');
});

// Adds data for a new student to our list of students.
app.post("/students", (req, res) => {
  let newStudent = req.body;

  if (!newStudent.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newStudent.id = uuid.v4();
    Students.push(newStudent);
    res.status(201).send(newStudent);
  }
});




//Update their user info (username, password, email, date of birth)
app.get("/movies/directors/:name", (req, res) => {
  res.send('Successful GET request returning data about director by name');
});

//Add a movie to the User's favorites list
app.get("/movies/directors/:name", (req, res) => {
  res.send('Successful GET request returning data about director by name');
});

//Remove a movie from user's favorites list
app.get("/movies/directors/:name", (req, res) => {
  res.send('Successful GET request returning data about director by name');
});

//Allow existing users to deregister
app.get("/movies/directors/:name", (req, res) => {
  res.send('Successful GET request returning data about director by name');
});


//error-handling middleware function
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
