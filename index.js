const express = require('express');
const app = express();

var myLogger = function (req, res, next) {
  console.log(req.url);
  next();
};

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(myLogger);
app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Welcome to my app!';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});
app.get('/secreturl', function (req, res) {
  var responseText = 'This is a secret url with super top-secret content.';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);

});
app.listen(3000);
