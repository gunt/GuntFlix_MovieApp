
//Importing express
const express = require('express'),

//Importing morgan middleware
const morgan = require('morgan');

const app = express();


//JSON object containing data about your top 10 movies.
let topBooks = [ {
    title : 'Harry Potter and the Sorcerer\'s Stone',
    author : 'J.K. Rowling'
},
{
    title : 'Lord of the Rings',
    author : 'J.R.R. Tolkien'
},
{
    title : 'Twilight',
    author : 'Stephanie Meyer'
}
]



// This function automatically routes all requests for static files // documentation
app.use(express.static('public'));


//Morgan middleware library to log all requests
app.use(morgan('common'));


//GET requests
app.get('/movies', function(req, res) {
  res.json(topTenMovies)
});

app.get('/', function(req, res) {
  res.send('Welcome to GuntFlix movie app!')
});





// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
