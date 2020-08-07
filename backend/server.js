const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const secret = process.env.secret || 'missing-env-secret'
var bcrypt = require('bcryptjs');

const port = 6200;
const Employee = require("./src/models/employee")

mongoose.connect('mongodb://mongodb')
  .then(() => {
    console.log('Backend Started');
    Employee.findOne({username: "admin"}, async (_, item) => {
      if (!item) {
        const defaultAdmin = new Employee({
          group: "admin",
          username: "admin",
          password: bcrypt.hashSync("xyz", bcrypt.genSaltSync())
        })
        await defaultAdmin.save()
        console.log("Default admin created")
      }
    })
  })
  .catch(err => {
    console.error('Backend error:', err.stack);
    process.exit(1);
  });

const employeeRoutes = require('./src/routes/employeeRoutes');
const missionRoutes = require('./src/routes/missionRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(cors());
app.use(jwt({secret: secret, algorithms: ['HS256']}).unless({path: [/^\/auth/]}))
app.use(bodyParser.json());
app.use('/employee', employeeRoutes);
app.use('/mission', missionRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log('Backend running on Port: ', port);
});
