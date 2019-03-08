'use strict';

exports.get_data_task = function(req, res) {
    const fs = require('fs');
    fs.readFile('data.json', (err, data) => {  
      if (err) throw err;
      let keyToSort = Object.keys(JSON.parse(data)[0])[0];
      res.contentType('application/json');
      res.json({
          data: [JSON.parse(data).sort(compareValues(keyToSort))],
          obj: {item1: "Motorhead", item2: "Tool", item3: "Meshuggah"}
      });
    })
}

// function for dynamic sorting
function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}