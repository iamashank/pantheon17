//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

// Team Schema
const TeamSchema = mongoose.Schema({
  teamName: {
    type: String,
    unique: true,
  },
  teamId: {
    type: Number,
    unique: true,
  },
  wins: [],
  points: {
    type: Number,
    default: 0,
  },
});

const Team = module.exports = mongoose.model('Team', UserSchema);
