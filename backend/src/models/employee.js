var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = new Schema({

    group: { type: String },
    username: { type: String },
    password: { type: String },

},{
    collection: 'Employees'
});

module.exports = mongoose.model('Employee', Employee);
