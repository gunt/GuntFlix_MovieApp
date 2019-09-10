const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/', function (req, res) {
  res.send('Welcome to my app!');
});
app.get('/secreturl', function (req, res) {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080);
