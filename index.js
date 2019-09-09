const express = require('express');
const app = express();

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

// GET requests
app.get('/', function(req, res) {
  res.send('Welcome to my book club!')
});
app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', { root : __dirname }
}));
app.get('/books', function(req, res) {
  res.json(topBooks)
});


// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
