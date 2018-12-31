var express = require('express');
var logger = require('morgan');

var restful = require('node-restful');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var categoryModel = require('./models/category')
var bandModel = require('./models/band')

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

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

categoryModel.register(app, mongoose);
bandModel.register(app, mongoose);

module.exports = app;
