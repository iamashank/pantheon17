//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

const TeamMemberSchema = mongoose.Schema({

  memberId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
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
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
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

const TeamMember = module.exports = mongoose.model('TeamMember', TeamMemberSchema);
