const spdy = require('spdy');
const fs = require('fs');

const options = {
  key: fs.readFileSync('../keys/privkey.pem'),
  cert: fs.readFileSync('../keys/fullchain.pem')
};

var file = fs.readFileSync('../assets/100k')

spdy.createServer(options, function(request, response) {
  for (let i = 0; i < 100; i++) {
    response.push('./' + i, {}, function(err, stream) {
      stream.end(file);
    });
  }
}).listen(443);
