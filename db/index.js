const db = require('./mysql.js');

/*
  Function Definitions
*/
const getProduct = (productId) => new Promise((resolve, reject) => {
  db.promise.query(`select * from product where id= ${productId}`)
    .then((product) => {
      resolve(product.length ? product[0] : 'Product does not exist');
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
  db.promise.query(`select * from stores where id= ${storeId}`)
    .then((store) => {
      resolve(store.length ? store[0] : 'Store does not exist');
    })
    .catch((err) => {
      reject(err);
    });
});

const getLocationZip = (zipCode) => new Promise((resolve, reject) => {
  db.promise.query(`select * from stores where zipCode= ${zipCode}`)
    .then((store) => {
      resolve(store.length ? store[0] : 'no store at this location');
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteStore = (storeId) => new Promise((resolve, reject) => {
  db.promise.query(`delete from inventory where store_Id= ${storeId}`)
    .then(() => db.promise.query(`delete from stores where id= ${storeId}`))
    .then(() => {
      resolve(`store ${storeId} has been deleted`);
    })
    .catch((err) => {
      reject(err);
    });
});

const newStore = (store) => new Promise((resolve, reject) => {
  const storeData = [
    [store.streetAddress, store.city, store.zipCode]
  ];
  const sqlStore = 'INSERT INTO stores (streetAddress, city, zipCode) VALUES ?';
  db.promise.query(sqlStore, [storeData])
    .then(() => {
      resolve(`store ${store} has been added`);
    })
    .catch((err) => {
      reject(err);
    });
});
const deleteProduct = (productId) => new Promise((resolve, reject) => {
  console.log(productId);
  db.promise.query(`delete from inventory where product_Id= ${productId}`)
    .then(() => db.promise.query(`delete from product where id= ${productId}`))
    .then(() => {
      resolve(`store ${sId} has been deleted`);
    })
    .catch((err) => {
      reject(err);
    });
});
const newProduct = (product) => new Promise((resolve, reject) => {
  const storeData = [
    [product.name, product.price, product.size, product.color, product.numOfRatings, product.totalNumStars]
  ];
  const sqlStore = 'INSERT INTO product (name, price, size, color, numOfRatings, totalNumStars) VALUES ?';
  db.promise.query(sqlStore, [storeData])
    .then(() => {
      resolve(`product ${product} has been added`);
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
