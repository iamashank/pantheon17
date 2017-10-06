//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

// Team Schema
const TeamSchema = mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  wins: [],
});

const Team = module.exports = mongoose.model('Team', TeamSchema);


module.exports.verifyTeam = function(eventName, teamName, callback) {
  Team.findOne({ teamName: { $regex : new RegExp(teamName, "i") }, eventName: eventName }).exec(callback);
};

module.exports.addTeam  = function(newTeam, callback) {
  newTeam.save(callback);
};

module.exports.getTeam = function(eventName, teamName, callback) {
  Team.findOne({ teamName: { $regex : new RegExp(teamName, "i") }, eventName: eventName }).exec(callback);
};

module.exports.getAllTeams = function(callback) {
  Team.find().exec(callback);
};

module.exports.updatePoints = function(eventName, teamName, points, winObj, callback) {
  Team.findOneAndUpdate({ teamName: teamName, eventName: eventName }, { $inc: { points: points }, $push: { wins: winObj }}).exec(callback);
};

module.exports.getLeaderboard = function(callback) {
  Team.find({ eventName: 'formalinformal'}).sort('-points').limit(30).exec(callback);
};
