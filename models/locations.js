const db = require('../db/connection.js');

const locationSchema = db.Schema({
  storeId: Number,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: Number,
});

const Locations = db.model('locations', locationSchema);

module.exports.locations = Locations;
module.exports.locationSchema = locationSchema;
