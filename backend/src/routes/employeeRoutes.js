var express = require('express');
var app = express();
var router = express.Router();
var bcrypt = require('bcryptjs');

var Employee = require('../models/employee');

router.route('/technicians').get(function (req, res) {
  Employee.find({group:"technician"}, function (err, item) {
    if (!item)
      res.json([])
    else
      res.json(item);
  });
});

router.route('/').get(function (req, res) {
  Employee.find(function (err, items) {
    if (err) {
      res.json(err);
    } else {
      res.json(items);
    }
  });
});

module.exports = router;
