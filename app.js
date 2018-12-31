var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

var restful = require('node-restful');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var products = require('./routes/products');

var mongoose = require('mongoose');
var uriString =
process.env.MONGODB_URI ||
process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/product';
mongoose.Promise = global.Promise;
mongoose.connect(uriString)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/products', products);
//
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

var Category = app.resource = restful.model(
  'category',
  mongoose.Schema({
    cat_name: String,
  })
).methods(['get', 'post', 'put', 'delete']);

Category.register(app, '/category');


module.exports = app;
