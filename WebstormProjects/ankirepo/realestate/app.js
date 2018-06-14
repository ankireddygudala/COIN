var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
var i18n = require('i18n');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const config = require('./config/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
i18n.configure({

    //define how many languages we would support in our application
    locales: ['en', 'ja'],

    //define the path to language json files, default is /locales
    directory: __dirname + '/locales',
    // query parameter to switch locale (ie. /home?lang=nl)
    queryParameter: 'lang',

    //define the default language
    defaultLocale: 'en',

    // define a custom cookie name to parse locale settings from
    cookie: 'i18n'
});

app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret: config.secrete,
    store: new MongoStore({url:config.database, autoReconnect:true}),
    cookie: {
        maxAge:  10000 // 30 min
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
    if (req.query.lang !== undefined) {
        if (req.query.lang === 'en') {
            res.cookie('i18n', 'en');
            req.en = "selected";
            req.jp = "";
        }
        else if (req.query.lang === 'ja') {
            res.cookie('i18n', 'ja');
            req.jp = "selected";
            req.en = "";
        }

    } else {

        // res.cookie('i18n', i18n.defaultLocale);
        if (req.getLocale() === 'en') {
            req.en = "selected";
            req.jp = "";
        }
        else {
            req.jp = "selected";
            req.en = "";
        }
    }
    next();
});
app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
