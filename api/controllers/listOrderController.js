'use strict';

exports.get_data_Order = (req, res) => {
  
  const fs = require('fs');
  fs.readFile('data.json', (err, data) => {  
    if (err) throw err;
    let i = 1;
    let StatusId = [];
    do {
      let totalStatus = JSON.parse(data).filter((status) => status.StatusId == i).length;
      let filterStatusDes = JSON.parse(data)
       .filter((status) => status.StatusId == i)
       .map((descr) => descr.StatusDesc).shift();
       StatusId.push({
        StatusId: i, StatusDesc: filterStatusDes, total: totalStatus
       });
      i++;
    }
    while (i < 6);

    let originId = JSON.parse(data).filter((origin, index, self) =>
      index === self.findIndex((t) => (
        t.OriginCountryId === origin.OriginCountryId
      ))
    ).map((origin) => origin.OriginCountryId);

    var j = 0;
    let OriginCountry = [];
    while (originId[j]) {
      let totalOrigin = JSON.parse(data).filter((origin) => origin.OriginCountryId == originId[j]).length;
      let filterOriginCountry  = JSON.parse(data)
        .filter((origin) => origin.OriginCountryId == originId[j])
        .map((descr) => descr.OriginCountry).shift();
      OriginCountry.push({
        OriginCountryId : originId[j], OriginCountry: filterOriginCountry, total: totalOrigin
      });
      j++;
    }

    let transId = JSON.parse(data).filter((trans, index, self) =>
      index === self.findIndex((t) => (
        t.TransportModeId === trans.TransportModeId
      ))
    ).map((trans) => trans.TransportModeId);

    var k = 0;
    let TransportMode = [];
    while (transId[k]) {
      let totalTrans = JSON.parse(data).filter((trans) => trans.TransportModeId == transId[k]).length;
      let filterTransportMode  = JSON.parse(data)
        .filter((trans) => trans.TransportModeId == transId[k])
        .map((descr) => descr.TransportMode).shift();
        TransportMode .push({
          TransportMode : filterTransportMode, TransportModeId : transId[k], total: totalTrans
        });
        k++;
    }

    let consigId = JSON.parse(data).filter((consig, index, self) =>
      index === self.findIndex((t) => (
        t.ConsigneeCode  === consig.ConsigneeCode 
      ))
    ).map((consig) => consig.ConsigneeCode);

    var l = 0;
    let TotalQtyOrderedByConsignee = [];
    while (consigId[l]) {
      let totalConsig = JSON.parse(data).filter((consig) => consig.ConsigneeCode == consigId[l]).length;
      let filterConsignee  = JSON.parse(data)
        .filter((consig) => consig.ConsigneeCode == consigId[l])
        .map((descr) => descr.ConsigneeName).shift();
        TotalQtyOrderedByConsignee.push({
          ConsigneeCode : consigId[l], ConsigneeName  : filterConsignee, total: totalConsig
        });
        l++;
    }

    let keyToSort = Object.keys(JSON.parse(data)[0])[0];
    let dataAll = JSON.parse(data).sort(compareValues(keyToSort));
    res.contentType('application/json');
    res.json({
        dataAll,
        totals: { StatusId, OriginCountry, TransportMode, TotalQtyOrderedByConsignee }
    });
  })
}

const compareValues = (key, order='asc') => {
  return (a, b) => {
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
