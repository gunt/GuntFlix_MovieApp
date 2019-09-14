//Importing express
const express = require('express');

//Importing body-parser & uuid
bodyParser = require("body-parser"),
  uuid = require("uuid");
const app = express();


//Importing morgan middleware
const morgan = require('morgan');

//JSON object containing data about top 10 movies.
//Return data (Movie title, description, genre, director, image URL,  about a single movie by title to the user
//director (bio, birth year, death year) by name
let topTenMovies = [{
    title: 'The Passion of the Christ',
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
    title: 'Hackers',
    description: 'Hackers are blamed for making a virus that will capsize five oil tankers.',
    genres: 'Comedy, Crime, Drama',
    director: {
      name: 'Iain Declan Softley',
      bio: 'Iain Declan Softley (born 28 October 1956) is an English film director, producer, and screenwriter. His films include Backbeat, Hackers, The Wings of the Dove, K-PAX, The Skeleton Key, and the BBC adaptation of Sadie Jones novel, The Outcast.',
      birthYear: '1958'
    },
    imageURL: 'https://www.imdb.com/title/tt0113243/mediaviewer/rm3325592832'
  },
  {
    title: 'The Social Network',
    description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
    genres: 'Biography, Drama',
    director: {
      name: 'David Fincher',
      bio: 'David Andrew Leo Fincher (born August 28, 1962) is an American film director, film producer, television director, television producer, and music video director.',
      birthYear: '1962'
    },
    imageURL: 'https://www.imdb.com/title/tt1285016/mediaviewer/rm1054049280'
  },
  {
    title: 'TPB AFK: The Pirate Bay Away from Keyboard',
    description: 'An intellectual freedoms documentary based around the interpersonal triumphs, and defeats of the three main characters against the largest industry in the known universe. The media industry.',
    genres: 'Documentary',
    director: {
      name: 'Simon Klose',
      bio: 'Simon Tobias Viktor Klose is a Swedish documentary and music video maker. His latest work is a documentary about The Pirate Bay called TPB AFK.',
      birthYear: '1975'
    },
    imageURL: 'https://www.imdb.com/title/tt2608732/mediaviewer/rm2467409152'
  },
  {
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    genres: 'Action, Sci-Fi',
    director: {
      name: 'The Wachowskis',
      bio: 'Lana Wachowski and her sister Lilly Wachowski, (also known as The Wachowskis) are the duo behind ground-breaking movies such as The Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent.',
      birthYear: '1965'
    },
    imageURL: 'https://www.imdb.com/title/tt0133093/mediaviewer/rm3441835264'
  },
  {
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    genres: ' Crime, Drama',
    director: {
      name: 'Francis Ford Coppola',
      bio: 'Francis Ford Coppola was born in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family.',
      birthYear: '1939'
    },
    imageURL: 'https://www.imdb.com/title/tt0068646/mediaviewer/rm2525403136'
  },
  {
    title: 'Gladiator',
    description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    genres: 'Action, Adventure, Drama ',
    director: {
      name: 'Ridley Scott',
      bio: 'Sir Ridley Scott is an English filmmaker. Following his commercial breakthrough in 1979 with the science fiction horror film Alien, further works include the neo-noir dystopian film Blade Runner, the road adventure film Thelma & Louise, the historical drama Gladiator and the science fiction film The Martian.',
      birthYear: '1937'
    },
    imageURL: 'https://www.imdb.com/title/tt0172495/mediaviewer/rm2274434560'
  },
  {
    title: 'Raiders of the Lost Ark',
    description: 'In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler Nazis can obtain its awesome powers.',
    genres: 'Action, Adventure',
    director: {
      name: 'Steven Spielberg',
      bio: 'Steven Allan Spielberg is an American filmmaker. He is considered one of the founding pioneers of the New Hollywood era and one of the most popular directors and producers in film history. Spielberg started in Hollywood directing television and several minor theatrical releases.',
      birthYear: '1946'
    },
    imageURL: 'https://www.imdb.com/title/tt0082971/mediaviewer/rm556972800'
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    genres: 'Action, Crime, Drama ',
    director: {
      name: 'Christopher Nolan',
      bio: 'Christopher Edward Nolan, CBE is an English-American film director, screenwriter, and producer, who is known for making personal, distinctive films within the Hollywood mainstream. He has been called "one of the ultimate auteurs."',
      birthYear: '1970'
    },
    imageURL: 'https://www.imdb.com/title/tt0468569/mediaviewer/rm3419897856'
  },
  {
    title: 'War Room',
    description: 'A seemingly perfect family looks to fix their problems with the help of Miss Clara, an older, wiser woman.',
    genres: 'Drama',
    director: {
      name: 'Alex Kendrick',
      bio: 'Born in Athens, Georgia as the middle of three sons to Larry and Rhonwyn Kendrick. Grew up in Smyrna, GA and graduated from Kennesaw State University with a Bachelors degree in Communications.',
      birthYear: '1970'
    },
    imageURL: 'https://www.imdb.com/title/tt3832914/mediaviewer/rm229439232'
  }
]

app.use(bodyParser.json());

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
  res.send('Successful GET request returning data about director by name.');
});

//Create a new User // /users
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    res.send("User added successfully.");
  }
});

//Update their user info (username, password, email, date of birth)
// /users/[username]/[password]/[email]/[date_of_birth]
app.put("/users/[username]/[password]/[email]/[date_of_birth]", (req, res) => {
  res.send('User information updated successfully.');
});

//Add a movie to the user's favorites list // /favorites/[username]/[title]
app.post("/favorites/[username]/[title]", (req, res) => {
  res.send('Favorite movie by user added successfully.');
});

//Remove a movie from user's favorites list // /favorites/[username]/[title]
app.delete("/favorites/[username]/[title]", (req, res) => {
  res.send('Movie deleted from favorite list successfully.');
});

//Allow existing users to deregister // /users/[username]
app.delete("/users/[username]", (req, res) => {
  res.send('User delete from registry successfully.');
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
