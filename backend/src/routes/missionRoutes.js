var express = require('express');
var app = express();
var router = express.Router();

var Mission = require('../models/mission');

router.route('/').get((_, res) => {
  items = Mission.find().populate('technicians', 'username').exec((err, missions) => {
    if (err) {
      res.status(200).json(err);
    } else {
      res.json(missions ?? []);
    }
  });
});

router.route('/affected').post((req, res) => {
  items = Mission.find({technicians: req.body._id})
    .populate('technicians', 'username')
    .exec((err, missions) => {
      if (err) {
        res.status(200).json(err);
      } else {
        res.json(missions ?? []);
      }
    });
});

router.route('/delete').delete(function (req, res) {
  Mission.findByIdAndRemove({_id: req.body._id},
    function(err, _) {
      if (err)
        res.json(err);
      else
        res.json('Mission deleted');
    });
});

router.route('/create').post(async (req, res) => {
  var item = new Mission(req.body);
  item.save()
    .then(_ => {
      res.status(200).json('Mission added.');
    })
    .catch(err => {
      console.error(err)
      res.status(400).send("unable to save to database");
    });
});

router.route('/setFinished').patch(async (req, res) => {
  try {
    await Mission.findByIdAndUpdate({_id: req.body._id}, {$set: {"finished": true}})
    res.json({"message": "Mission updated."})
  } catch (err) {
    console.error(err)
    res.json({"error": "internal server error"})
  }
});

module.exports = router;
