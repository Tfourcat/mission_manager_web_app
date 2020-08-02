var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Mission = new Schema({

  name: { type: String },
  date: { type: Date },
  location: { type: String },
  estimatedTime: { type: Date },
  technicians: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}],
  status: { type: String, default: "Waiting to start" },
  finished: { type: Boolean, default:false }

},{
  collection: 'Missions'
});

module.exports = mongoose.model('Mission', Mission);
