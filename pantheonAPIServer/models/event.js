//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

// Team Schema
const EventSchema = mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  day: {
    type: String,
  },
  time: {
    type: String,
  },
  time24: {
    type: String,
  },
  venue: {
    type: String,
  },
  teamSize: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  points1: {
    type: String,
  },
  points2: {
    type: String,
  },
  points3: {
    type: String,
  },
  eventCoordinator1: {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    }
  },
  eventCoordinator2: {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    }
  },
  eventCoordinator3: {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    }
  },
  status: {
    type: String,
  },
  position1: {
    teamName: {
      type: String,
    },
    points: {
      type: Number
    }
  },
  position2: {
    teamName: {
      type: String,
    },
    points: {
      type: Number
    }
  },
  position3: {
    teamName: {
      type: String,
    },
    points: {
      type: Number
    }
  },
});

const Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.addNewEvent = function(newEvent, callback) {
  newEvent.save(callback);
};

module.exports.editEvent = function(event, callback) {
  Event.findOneAndUpdate({ eventId: event.eventId }, { $set: { club: event.club, day: event.day, time: event.time, time24: event.time24, venue: event.venue, teamSize: event.teamSize, points1: event.points1, points2: event.points2, points3: event.points3, description: event.description, status: event.status, eventCoordinator1: { name: event.eventCoordinator1.name,  phoneNumber: event.eventCoordinator1.phoneNumber }, eventCoordinator2: { name: event.eventCoordinator2.name,  phoneNumber: event.eventCoordinator2.phoneNumber } }})
  .exec(callback);
};

module.exports.updateResults = function(data, callback) {
  Event.findOneAndUpdate({ eventId: data.eventId }, { $set: { position1: { teamName: data.winner1, points: data.points1 }, position2: { teamName: data.winner2, points: data.points2 }, position3: { teamName: data.winner3, points: data.points3 }}}).exec(callback);
};

module.exports.getAllEvents = function(callback) {
  Event.find().exec(callback);
};

module.exports.getEventCount = function(callback) {
  Event.count({}, callback);
};


module.exports.getEventById = function(id, callback) {
  Event.findOne({ eventId: id }, callback);
};
