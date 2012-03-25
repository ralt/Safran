/**
 * Most of the code is found here :
 * http://naholyr.fr/2011/07/authentification-et-websocket-avec-node-js-express-et-socket-io/
 * 
 * Code exporting into other files :
 * http://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
 * 
 * Interesting link about socket.io and sessions :
 * http://www.danielbaulig.de/socket-ioexpress/
 * 
 * Savior link about session length :
 * http://rahulmehta1.wordpress.com/2011/11/03/login-form-in-node-js-with-session-mangement/
 */

var path = require('path');
var express = require('express');
var app = module.exports = express.createServer();
var port = process.env.PORT || 80;
var RedisStore = require('connect-redis')(express);
var redis = require('redis');
var client = redis.createClient();
var pub = redis.createClient();
var sub = redis.createClient();
require('bufferjs/concat');

/**
 * In case an error happens with redis
 */
client.on("error", function (err) {
  console.log("error event - " + client.host + ":" + client.port + " - " + err);
});

/**
 * Configuration
 */
app.configure(function() {
  // Defines the view folder and engine used.
  this.set('views', path.join(__dirname, 'views'));
  this.set('view engine', 'ejs');
  
  // Allow parsing form data
  this.use(express.bodyParser());
  
  // Allow parsing cookies from request headers
  this.use(express.cookieParser());
  // Session management
  this.sessionStore = new RedisStore;
  this.use(express.session({
    // Private crypting key
    secret: 'SFGJRvOFoYIkA5CP7CTFSFGJRvOFoYIkA5CP7CTFSFGJRvOFoYIkA5CP7CTF',
    store: this.sessionStore,
    cookie: {
      /*_expires: date.toGMTString(),*/
      maxAge: 1800000
    }
  }));
});
app.configure('development', function(){
  this.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});
app.configure('production', function(){
  this.use(express.errorHandler());
});

/**
 * Routes
 */
require('./routes/socket.js')(app, client, pub, sub);
require('./routes/middlewares.js')(app);
require('./routes/home.js')(app, client);
require('./routes/guest.js')(app, client);
require('./routes/logout.js')(app);
require('./routes/about.js')(app);
require('./routes/404.js')(app);

/**
 * Start server
 */
if (!module.parent) {
  app.listen(port);
}
