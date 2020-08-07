var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const secret = process.env.secret || 'missing-env-secret'

var Employee = require('../models/employee');

router.route('/login').post((req, res) => {
  const {username, password} = req.body;
  login(username, password, (match, user) => {return(match && user.group != "admin")}, res);
});

router.route('/loginAdmin').post((req, res) => {
  const {username, password} = req.body;
  login(username, password, (match, user) => {return(match && user.group == "admin")}, res);
});

const login = (username, password, validator, res) => {
  Employee.findOne({username: username}, (err, user) => {
    if (err) {
      res.status(500).json({"error": "internal server error"})
    } else if (!user) {
      res.status(401).json({"error": `user ${username} not found`})
    } else {
      const match = bcrypt.compareSync(password, user.password)
      if (validator(match, user)) {
        res.status(200).json({
          "message": "Loggin successful, token send.",
          "token": jwt.sign({userId: user._id}, secret),
          "userGroup": user.group,
          "userId": user._id
        })
      } else {
        res.status(401).json({"error": match ? 'you should be an employee to login' : 'invalid login'})
      }
    }
  })
}

router.route('/register').post((req, res) => {
  const user = new Employee(req.body);
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync())
  Employee.findOne({username: user.username}, async (_, item) => {
    if (item) {
      res.status(400).send("username already exist")
    } else {
      try {
        await user.save()
        res.json({message: 'Employee added'})
      } catch (err) {
        console.log(err)
        res.status(400).send("unable to save to database")
      }
    }
  })
});

module.exports = router;
