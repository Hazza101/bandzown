var restful = require('node-restful');

exports.register = function(app, mongoose) {
  var Category = app.resource = restful.model(
    'category',
    mongoose.Schema({
      cat_name: String,
    })
  ).methods(['get', 'post', 'put', 'delete']);

  Category.register(app, '/category');
}
