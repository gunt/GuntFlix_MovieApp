
//Importing express
const express = require('express'),

//Importing morgan middleware
const morgan = require('morgan');

const app = express();





// GET requests

app.get('/movies', function(req, res) {
  res.json(topTenMovies)
});

app.get('/', function(req, res) {
  res.send('Welcome to my book club!')
});


// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
