var express = require('express');
var app = express();
var router = express.Router();

var Mission = require('../models/mission');

router.route('/').get(function (req, res) {
  items = Mission.find().populate('technicians', 'username').exec((err, missions) => {
    if (err) {
      res.status(200).json(err);
    } else {
      res.json(missions);
    }
  });
});

router.route('/affected').post(function (req, res) {
  items = Mission.find({technicians: req.body._id})
    .populate('technicians', 'username')
    .exec((err, missions) => {
      if (err) {
        res.status(200).json(err);
      }   else {
        res.json(missions);
      }
  });
});

router.route('/add').post(function (req, res) {
  var item = new Mission(req.body);
  item.save()
    .then(item => {
      res.status(200).json('Mission added.');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.route('/delete').delete(function (req, res) {
  Mission.findByIdAndRemove({_id: req.body._id},
    function(err, item) {
      if (err)
        res.json(err);
      else
        res.json('Mission deleted');
    });
});

router.route('/setFinished').patch(function (req, res) {
  Mission.findByIdAndUpdate({_id: req.body._id}, {$set: {"finished": true}})
    .then(res.json('Mission updated')).catch(err => res.json(err))
});

module.exports = router;
