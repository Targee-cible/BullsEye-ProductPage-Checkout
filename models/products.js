const db = require('../db/connection');
require('mongoose-currency').loadType(db);

const { Currency } = db.Types;

const reviewSchema = db.Schema({
  rating: Number,
});

const productSchema = db.Schema({
  productId: Number,
  name: String,
  price: { type: Currency },
  size: [String],
  color: {},
  reviews: [reviewSchema],
});

const Products = db.model('products', productSchema);

module.exports.products = Products;
module.exports.productSchema = productSchema;
