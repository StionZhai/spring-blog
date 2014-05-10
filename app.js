
/**
 * Module dependencies.
 */

var express = require('express')
,   routes = require('./routes')
,   http = require('http')
,   path = require('path')
,   MongoStore = require('connect-mongo')(express)
,   settings = require('./settings')
,   flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon(__dirname, 'public/images/favicon.png'));
app.use(express.logger('dev'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './public/images' }));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret: settings.cookieSecret,
  key: settings.db, //cookie name
  cookie: {maxAge: 1000*60*60*24*3},
  store: new MongoStore({
    db: settings.db
  })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
