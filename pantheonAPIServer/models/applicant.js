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
  firebaseId: {
    type: String,
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
  otp: {
    type: Number,
    required: true,
  },
  otpVerified: {
    type: Boolean,
    default: false,
  },
  registered: {
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
  },
  accomodationRequired: {
    type: Boolean,
  },
  formalinformal: {
    type: String,
    default: null,
  },
  illuminati: {
    type: String,
    default: null,
  },
  droidtrooper: {
    type: String,
    default: null,
  },
  eureka: {
    type: String,
    default: null,
  },
  codezilla: {
    type: String,
    default: null,
  },
  cyberbrigeton: {
    type: String,
    default: null,
  }
});

const Applicant = module.exports = mongoose.model('Applicant', ApplicantSchema);

module.exports.addNewApplicant = function(newApplicant, callback) {
  newApplicant.save(callback);
};

module.exports.verifyApplicant = function(email, phoneNumber, callback) {
  Applicant.findOne({ email: email, phoneNumber: phoneNumber }).exec(callback);
};

module.exports.verifyOtp = function(email, phoneNumber, callback) {
  Applicant.findOneAndUpdate({ email: email, phoneNumber: phoneNumber }, { $set: { otpVerified: true }}).exec(callback);
};


module.exports.updateApplicant = function(applicant, callback) {
  Applicant.findOneAndUpdate({ name: applicant.name, email: applicant.email, phoneNumber: applicant.phoneNumber }, { $set: { city: applicant.city, state: applicant.state, rollNumber: applicant.rollNumber, gender: applicant.gender, year: applicant.year, collegeName: applicant.collegeName, registered: true, payment: applicant.payment }}).exec(callback);
};

module.exports.getAllApplicants = function(callback) {
  Applicant.find().exec(callback);
};

module.exports.updateOtp = function(email, phoneNumber, otp, callback) {
  Applicant.findOneAndUpdate({ email: email, phoneNumber: phoneNumber }, { $set: { otp: otp, otpVerified: false }}).exec(callback);
};

module.exports.getApplicantCount = function(callback) {
  Applicant.count({}, callback);
};

module.exports.verifyForTeam = function(id, email, callback) {
  Applicant.findOne({ id: id, email: email, registered: true }).exec(callback);
};

module.exports.registerTeam = function(id, teamName, eventName, callback) {
  if (eventName === 'formalinformal') {
    Applicant.findOneAndUpdate({ id: id }, { $set: { formalinformal: teamName }}).exec(callback);
  } else {
    if (eventName === 'illuminati') {
      Applicant.findOneAndUpdate({ id: id }, { $set: { illuminati: teamName }}).exec(callback);
    } else {
      if (eventName === 'droidtrooper') {
        Applicant.findOneAndUpdate({ id: id }, { $set: { droidtrooper: teamName }}).exec(callback);
      } else {
        if (eventName === 'eureka') {
          Applicant.findOneAndUpdate({ id: id }, { $set: { eureka: teamName }}).exec(callback);
        } else {
          if (eventName === 'codezilla') {
            Applicant.findOneAndUpdate({ id: id }, { $set: { codezilla: teamName }}).exec(callback);
          } else {
            if (eventName === 'cyberbrigeton') {
              Applicant.findOneAndUpdate({ id: id }, { $set: { cyberbrigeton: teamName }}).exec(callback);
            } else {
              callback(`Could not match any event`, null);
            }
          }
        }
      }
    }
  }
};

module.exports.getApplicantById = function(id, callback) {
  Applicant.findOne({ id: id }, callback);
};


module.exports.getApplicantsByTeam = function(eventName, teamName, callback) {
  if (eventName === 'formalinformal') {
    Applicant.find({ formalinformal: { $regex : new RegExp(teamName, "i") } })
    .select('id name collegeName email phoneNumber').exec(callback);
  } else {
    if (eventName === 'illuminati') {
      Applicant.find({ illuminati: { $regex : new RegExp(teamName, "i") } })
      .select('id name collegeName email phoneNumber').exec(callback);
    } else {
      if (eventName === 'droidtrooper') {
        Applicant.find({ droidtrooper: { $regex : new RegExp(teamName, "i") } })
        .select('id name collegeName email phoneNumber').exec(callback);
      } else {
        if (eventName === 'eureka') {
          Applicant.find({ eureka: { $regex : new RegExp(teamName, "i") } })
          .select('id name collegeName email phoneNumber').exec(callback);
        } else {
          if (eventName === 'codezilla') {
            Applicant.find({ codezilla: { $regex : new RegExp(teamName, "i") } })
            .select('id name collegeName email phoneNumber').exec(callback);
          } else {
            if (eventName === 'cyberbrigeton') {
              Applicant.find({ cyberbrigeton: { $regex : new RegExp(teamName, "i") } })
              .select('id name collegeName email phoneNumber').exec(callback);
            } else {
              callback(`Could not match any event`, null);
            }
          }
        }
      }
    }
  }
};

module.exports.updatePayment = function(data, callback) {
  Applicant.findOneAndUpdate({ id: data.id }, { $set: { payment: { day1: data.data1, day2: data.day2, day3: data.day3 }}}).exec(callback);
};
