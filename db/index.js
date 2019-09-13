const Products = require('../models/products.js');
const Inventory = require('../models/inventory.js');
const Locations = require('../models/locations.js');

/*
  Function Definitions
*/
const getProduct = (productId) => new Promise((resolve, reject) => {
  Products.products.find({ productId })
    .then((product) => {
      resolve(product.length ? product[0] : 'Product Does Not Exist');
    })
    .catch((err) => {
      reject(err);
    });
});

const getQuantity = (productId, color, size, storeId) => new Promise((resolve, reject) => {
  // eslint-disable-next-line object-curly-newline
  Inventory.find({ productId, color, size, storeId })
    .then((result) => {
      resolve(result.length ? result[0].quantity : 0);
    })
    .catch((err) => {
      reject(err);
    });
});

const getLocation = (storeId) => new Promise((resolve, reject) => {
  Locations.locations.find({ storeId })
    .then((result) => {
      resolve(result.length ? result[0] : 'Store Does Not Exist');
    })
    .catch((err) => {
      reject(err);
    });
});

const getLocationZip = (zipCode) => new Promise((resolve, reject) => {
  Locations.find({ zipCode })
    .then((result) => {
      resolve(result.length ? result[0] : 'Store Does Not Exist');
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteStore = (store) => new Promise((resolve, reject) => {
  Locations.locations.deleteOne({ storeId: store })
    .then(() => {
      resolve('store deleted');
    })
    .catch((err) => {
      reject(err);
    });
});
const newStore = (store) => new Promise((resolve, reject) => {
  Locations.locations.create(store)
    .then(() => {
      resolve('store added');
    })
    .catch((err) => {
      reject(err);
    });

});
const deleteProduct = (product) => new Promise((resolve, reject) => {
  Products.products.deleteOne({ productId: product })
    .then(() => {
      resolve('product deleted');
    })
    .catch((err) => {
      reject(err);
    });
});
const newProduct = (product) => new Promise((resolve, reject) => {
  Products.products.create(product)
    .then(() => {
      resolve('product added');
    })
    .catch((err) => {
      reject(err);
    });

});

const updateProduct = (prodId, productData) => new Promise((resolve, reject) => {
  Products.products.find({ productId: prodId })
    .then((products) => {

      const product = products[0];
      // update product properties with productData
      // eslint-disable-next-line no-restricted-syntax
      // const keys = Object.keys(productData);
      // console.log('hellojhjh');
      // for (let i = 0; i < keys.length; i += 1) {
      //   product[keys[i]] = productData[keys[i]];
      // }
      // for (var key in productData) {
      //   product[key] = productData[key];
      // }


      product["price"] = productData["price"];

      return product.save();
    })
    .then(() => {
      resolve('product updated');
    })
    .catch((err) => {
      reject(err);
    });
})

module.exports.getProduct = getProduct;
module.exports.getQuantity = getQuantity;
module.exports.getLocation = getLocation;
module.exports.getLocationZip = getLocationZip;
module.exports.deleteStore = deleteStore;
module.exports.newStore = newStore;
module.exports.deleteProduct = deleteProduct;
module.exports.newProduct = newProduct;
module.exports.updateProduct = updateProduct;
