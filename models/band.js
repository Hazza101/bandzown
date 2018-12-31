var restful = require('node-restful');

exports.register = function(app, mongoose) {
  var Band = app.resource = restful.model(
    'band',
    mongoose.Schema({
      name: String,
      genre: String,
      number_of_members: Number
    })
  ).methods(['get', 'post', 'put', 'delete']);

  Band.register(app, '/bands');
}
