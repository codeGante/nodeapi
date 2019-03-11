'use strict';
module.exports = function(app) {
  let listOrder = require('../controllers/listOrderController');
  app.route('/all').get(listOrder.get_data_Order)
};