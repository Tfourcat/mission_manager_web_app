var express = require('express');
var app = express();
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const secret = process.env.secret || 'missing-env-secret'

var Employee = require('../models/employee');

router.route('/login').post(function (req, res) {
  const username = req.body.username;
  Employee.findOne({username: username}, function (err, user) {
    if (!user)
      res.status(401).json({"error": "Invalid login"})
    else {
      const match = bcrypt.compareSync(req.body.password, user.password)
      if (match && user.group != "admin") {
        res.status(200).json(
        {"message": "Loggin successful token send",
          "token": jwt.sign({userId: user._id}, secret),
          "userGroup": user.group,
          "userId": user._id})
      } else
        res.status(401).json({"error": "Invalid login"})
    }
  }).catch(err => console.log(err));
});

router.route('/loginAdmin').post(function (req, res) {
  const username = req.body.username;
  Employee.findOne({username: username}, function (err, user) {
    if (!user)
      res.status(401).json({"error": "Invalid login"})
    else {
      const match = bcrypt.compareSync(req.body.password, user.password)
      if (match && user.group == "admin") {
        res.status(200).json({
          "message": "Loggin successful token send",
          "token": jwt.sign({userId: user._id}, secret),
          "userGroup": user.group,
          "userId": user._id})}
      else
        res.status(401).json({"error": "Invalid login"})
    }
  }).catch(err => console.log(err));
});

router.route('/register').post(function (req, res) {
  var user = new Employee(req.body);
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync())
  user.save()
    .then(() => {
      res.json({message: 'Employee added'})
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = router;
