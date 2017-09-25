//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

// Team Schema
const SAPSchema = mongoose.Schema({

  sapId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  answer1: {
    type: String,
    required: true,
  },
  answer2: {
    type: String,
    required: true,
  },
  answer3: {
    type: String,
    required: true,
  },
  answer4: {
    type: String,
    required: true,
  },
  answer5: {
    type: String,
    required: true,
  }
});

const SAP = module.exports = mongoose.model('SAP', SAPSchema);

module.exports.addNewSAP = function(newSAP, callback) {
  newSAP.save(callback);
};

module.exports.getAllSAPS = function(callback) {
  SAP.find().exec(callback);
};

module.exports.getCount = function(callback) {
  SAP.count({}, callback);
};
