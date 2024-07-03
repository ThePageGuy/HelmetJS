const express = require('express');
const helmet = require('helmet');
const app = express();

// Use helmet with specific configurations
app.use(helmet({
  frameguard: { action: 'deny' }, // Configure frameguard to deny
  contentSecurityPolicy: {       // Enable and configure CSP
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false,      // Disable dnsPrefetchControl
  noCache: true,                  // Enable noCache
}));


module.exports = app;

const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
