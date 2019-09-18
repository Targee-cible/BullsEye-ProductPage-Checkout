const nano = require('nano')('http://localhost:5984');

const checkout = nano.db.use('sdccheckout');

module.exports = checkout;
