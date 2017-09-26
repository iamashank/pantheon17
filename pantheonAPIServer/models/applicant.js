//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

const ApplicantSchema = mongoose.Schema({
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
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
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
  otp: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  rollNumber: {
    type: String,
  },
  payment: {
    day1: {
      type: Boolean,
      default: false,
    },
    day2: {
      type: Boolean,
      default: false,
    },
    day3: {
      type: Boolean,
      default: false,
    }
  }
});

const Applicant = module.exports = mongoose.model('Applicant', ApplicantSchema);

module.exports.addNewApplicant = function(newApplicant, callback) {
  newApplicant.save(callback);
};

module.exports.verifyApplicant = function(name, email, phoneNumber, callback) {
  Applicant.findOne({ name: name, email: email, phoneNumber: phoneNumber }).exec(callback);
};

module.exports.updateApplicant = function(applicant, callback) {
  Applicant.findOneAndUpdate({ name: applicant.name, email: applicant.email, phoneNumber: applicant.phoneNumber }, { $set: { city: applicant.city, state: applicant.state, rollNumber: applicant.rollNumber, gender: applicant.gender, year: applicant.year, collegeName: applicant.collegeName, verified: true }}).exec(callback);
};

module.exports.getAllApplicant = function(callback) {
  Applicant.find().exec(callback);
};

module.exports.getApplicantCount = function(callback) {
  Applicant.count({}, callback);
};


module.exports.getApplicantById = function(id, callback) {
  Applicant.findOne({ id: id }, callback);
};
