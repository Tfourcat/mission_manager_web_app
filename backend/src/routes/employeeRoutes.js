const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

router.route('/technicians').get((_, res) => {
  Employee.find({group: "technician"}, (err, items) => {
    if (err) {
      res.json({"error": "internal server error"})
    } else {
      res.json(items ?? [])
    }
  })
});

router.route('/').get((_, res) => {
  Employee.find((err, items) => {
    if (err) {
      console.error(err)
      res.json("internal server error");
    } else {
      res.json(items ?? []);
    }
  });
});

module.exports = router;
