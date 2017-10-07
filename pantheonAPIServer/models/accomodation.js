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
  sapId: {
    type: String,
  },
  sapName: {
    type: String,
  },
  arrivalDateAndTime: {
    type: String,
  },
  tickets: {
    type: String,
  }
});

const Accomodation = module.exports = mongoose.model('Accomodation', AccomodationSchema);

module.exports.addAccomodation = function(newAccomodation, callback) {
  newAccomodation.save();
};

module.exports.checkAccomodation = function(id, calback) {
  Accomodation.findOne({ id: id }).exec(callback);
};


module.exports.getAccomodationList = function(callback) {
  Applicant.find().exec(callback);
};
