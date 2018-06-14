var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require("i18n");
var hbs = require('hbs');
var fs = require('fs');
// var exphbs  = require('express-handlebars');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

i18n.configure({
    locales: ['jp', 'en'],
    defaultLocale: 'en',
    cookie: 'locale',
    directory: __dirname + '/locales',
    api: {
        '__': '__',  //now req.__ becomes req.__
        '__n': '__n' //and req.__n can be called as req.__n
    }
});
var app = express();


// view engine setup
// app.engine('hbs', exphbs({
//     extname:'hbs',
//     defaultLayout:'main.hbs'
//     // layoutsDir: path.join(__dirname, 'views/layout')
// }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);



app.use('/', indexRouter);
app.use('/users', usersRouter);

hbs.registerPartials(__dirname + '/views/partials');
// register hbs helpers in res.locals' context which provides this.locale
hbs.registerHelper('__', function () {
    return i18n.__.apply(this, arguments);
});
hbs.registerHelper('__n', function () {
    return i18n.__n.apply(this, arguments);
});
//registrer partials
hbs.registerPartial('headPartial', fs.readFileSync(__dirname + '/views/partials/header.hbs', 'utf8'));




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
