const createError = require('http-errors')
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const session = require("express-session")
const passport = require('./auth/passport')
const pagiHelper = require('express-handlebars-paginate');
const expressHandlebarsSections = require('express-handlebars-sections');

let hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) { });
hbs.registerHelper('createPagination', pagiHelper.createPagination);
hbs.registerHelper('section', expressHandlebarsSections());
hbs.registerHelper('ifCond', function (v1, operator, v2, options) {

  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Database
const db = require('./config/database')
db.authenticate()
  .then(() => console.log("DB connected...........\n"))
  .catch(err => console.log("Error......." + err))

//////////////////////

//passport

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

///////////////////////
app.use(function (req, res, next) {
  res.locals.currentAdminUser = req.user;
  next();
});


// Admin route
const adminRouter = require('./routes')


app.set("views", "./views")
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use('/', adminRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use('*', (req, res) => res.render('404', { layout: '404' }))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
