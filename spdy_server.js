const spdy = require('spdy');
const fs = require('fs');

const options = {
  key: fs.readFileSync('keys/privkey.pem'),
  cert: fs.readFileSync('keys/fullchain.pem')
};

var files = [];
for (let i = 0; i <= 100; i++) {
  files[i] = fs.readFileSync('./assets/' + i + "k");
}

if (process.argv[2] === undefined || process.argv[3] === undefined) {
  var onRequest = function(request, response) {
    for (let i = 0; i < files.length; i++) {
      response.push('./' + i, {}, function(err, stream) {
        if (err) return;
        stream.end(files[i]);
      });
    }
  }
} else {
  var fileIndex = process.argv[2];
  var repetition = process.argv[3];
  var onRequest = function(request, response) {
    for (let i = 0; i < repetition; i++) {
      response.push('./' + i, {}, function(err, stream) {
        if (err) return;
        stream.end(files[fileIndex]);
      });
    }
  }
}

spdy.createServer(options, onRequest).listen(443);
