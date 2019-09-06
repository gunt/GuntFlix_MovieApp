const http = require('http'),
  fs = require('fs'),
  url = require('url');

http.createServer((request, response) => {
  var addr = request.url,
    q = url.parse(addr, true),
    filePath = '';

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html'); // testing redirect to index.html
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }

    // to log both the request URL and timestap to the log.txt file
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Added to log.');
      }
    });


    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.write(data);
    response.end();

  });

}).listen(8080);
