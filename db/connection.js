const nano = require('nano')('http://localhost:5984');

const checkout = nano.db.use('sdccheckout');

// const indexDef = {
//   index: { fields: ['product_Id'] },
//   name: 'productKey'
// };
// checkout.createIndex(indexDef)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
// });

module.exports = checkout;
