// const db = require('./mysql.js');
// const couch = require('../db/connection');
const checkout = require('./connection.js');
/*
  Function Definitions
*/


// const dbName = 'sdccheckout';
// const viewUrl = '_design/all_products/_view/all';

// app.get('/test', (req, res) => {
//   couch.get(dbName, viewUrl)
//     .then((data) => {
//       console.log(data.data.rows);
//       res.send(data.data.rows);
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// });

const getProduct = (productId) => new Promise((resolve, reject) => {
  // checkout.get(productId)
  checkout.view('all_products', 'all', {
    'key' : parseInt(productId)
  })
  // console.log(typeof productId);
  // const query = {
  //   selector: {
  //     product_id: { "$eq": parseInt(productId) }
  //   },
  //   use_index: ["_design/all_products", "all"],
  //   fields: ["product_id"]
  // };
  // checkout.find(query)
    .then((product) => {
      // resolve(product.length ? product[0] : 'Product does not exist');
      resolve(product.rows[0].value);
    })
    .catch((err) => {
      reject(err);
    });

});

const getQuantity = (productId, color, size, storeId) => new Promise((resolve, reject) => {
  // eslint-disable-next-line object-curly-newline
  // TODO: Implement this
  // Inventory.find({ productId, color, size, storeId })
  //   .then((result) => {
  //     resolve(result.length ? result[0].quantity : 0);
  //   })
  //   .catch((err) => {
  //     reject(err);
  //   });
});

const getLocation = (storeId) => new Promise((resolve, reject) => {
  db.dbconnect.query(`select * from stores where id= ${storeId}`)
    .then((store) => {
      resolve(store.length ? store[0] : 'Store does not exist');
    })
    .catch((err) => {
      reject(err);
    });
});

const getLocationZip = (zipCode) => new Promise((resolve, reject) => {
  db.dbconnect.query(`select * from stores where zipCode= ${zipCode}`)
    .then((store) => {
      resolve(store.length ? store[0] : 'no store at this location');
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteStore = (storeId) => new Promise((resolve, reject) => {
  db.dbconnect.query(`delete from inventory where store_Id= ${storeId}`)
    .then(() => db.dbconnect.query(`delete from stores where id= ${storeId}`))
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
  db.dbconnect.query(sqlStore, [storeData])
    .then(() => {
      resolve(`store ${store} has been added`);
    })
    .catch((err) => {
      reject(err);
    });
});
const deleteProduct = (productId) => new Promise((resolve, reject) => {
  console.log(productId);
  db.dbconnect.query(`delete from inventory where product_Id= ${productId}`)
    .then(() => db.dbconnect.query(`delete from product where id= ${productId}`))
    .then(() => {
      resolve(`store ${productId} has been deleted`);
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
  db.dbconnect.query(sqlStore, [storeData])
    .then(() => {
      resolve(`product ${product} has been added`);
    })
    .catch((err) => {
      reject(err);
    });

});

const updateProduct = (prodId, productData) => new Promise((resolve, reject) => {
  let queryString = 'update product set ';
  for (var key in productData) {
    if (productData.hasOwnProperty(key)) {
      queryString += `${key} = "${productData[key]}", `;
    }
  }
  let queryMinusComma = queryString.slice(0, -2);
  queryMinusComma += ` where id= ${prodId}`;
  db.dbconnect.query(queryMinusComma)
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
