const spdy = require('spdy');
const https = require('https');
const url = 'mywebsite.com';

var agent = spdy.createAgent({
  host: url,
  port: 443,
});

var request = https.get({
  host: url,
  agent: agent
});

var count = 0;
var hrstart = process.hrtime();
request.on('push', function(stream) {
  let hrend = process.hrtime(hrstart);
  console.info("%d: Package received: %ds %dms", ++count, hrend[0], hrend[1]/1000000);
});
