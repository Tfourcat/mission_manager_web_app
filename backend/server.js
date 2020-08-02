var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('express-jwt');
const secret = process.env.secret || 'missing-env-secret'

var port = 6200;

mongoose.connect('mongodb://mongodb')
    .then(() => {
      console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });

var employeeRoutes = require('./src/routes/employeeRoutes');
var missionRoutes = require('./src/routes/missionRoutes');
var authRoutes = require('./src/routes/authRoutes');

var app = express();
app.use(cors());
app.use(jwt({secret: secret, algorithms: ['HS256']}).unless({path: [/^\/auth/]}))
app.use(bodyParser.json());
app.use('/employee', employeeRoutes);
app.use('/mission', missionRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log('Backend running on Port: ', port);
});
