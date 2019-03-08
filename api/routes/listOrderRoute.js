'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/listOrderController');

  app.route('/all')
    .get(todoList.get_data_task)
    
};