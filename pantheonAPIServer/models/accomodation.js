//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

const AccomodationSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
  },
  year: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  rollNumber: {
    type: String,
  },
});

const Accomodation = module.exports = mongoose.model('Accomodation', AccomodationScheme);

module.exports.addAccomodation = function(newAccomodation, callback) {
  newAccomodation.save();
};


module.exports.getAccomodationList = function(callback) {
  Applicant.find().exec(callback);
};
