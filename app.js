var flash = require('connect-flash');
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config');
var User = require('./models/user');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  
var MongoStore = require('connect-mongo')(express);
var i18n = require('i18n-2');
var mongooseConnection = mongoose.connect(config.db.url, function(err) {
    if (err) {
        console.log('Could not connect to database', config.db.url, ' due to error', err);
        process.exit(1);
    }
});

var app = express();

// Express settings
app.disable('x-powered-by');

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(config.secret));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
  
app.use(express.session({
    secret: config.sessionSecret,
    store: new MongoStore({
        collection: "sessions",
        mongoose_connection: mongooseConnection.connections[0]
    }),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function(username, password, done) {
    User.findOne({ niceName: username }, function (err, user) {
      console.log('passport check username and password ...');
      if (err) { 
        console.log(err);
        return done(err); 
      }
      if (!user) {
        console.log('Incorrect username.');
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log('Incorrect password.');
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

i18n.expressBind(app, { locales: ['zh', 'en'] });
app.i18n = i18n;

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

require('./helpers')(app);
require('./routes')(app);

// Start server if not invoked by require('./app')
if (require.main === module) {
    http.createServer(app).listen(config.port, config.address, function() {
        console.log("Express server listening on %s:%d in %s mode", config.address, config.port, app.settings.env);
    });    
} else {
    // Export app if invoked by require('./app')
    module.exports = app;
}
