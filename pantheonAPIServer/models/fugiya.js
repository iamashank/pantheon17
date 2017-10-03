//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

// Team Schema
const FugiyaSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: string,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  }
});

const Fugiya = module.exports = mongoose.model('Fugiya', EventSchema);

module.exports.addParticipant = function(newParticipant, callback) {
  newParticipant.save(callback);
};

module.exports.getAllPariticipants = function(callback) {
  Fugiya.find().exec(callback);
};
