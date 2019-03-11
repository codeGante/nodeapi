let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./api/routes/listOrderRoute');
routes(app); 

app.listen(port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + 'Not found'})
})

console.log('[GET] List order dynamic RESTful API server started on: ' + port);
