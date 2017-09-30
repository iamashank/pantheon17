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
  Event.findOneAndUpdate({ eventId: event.eventId }, { $set: { name: event.name, club: event.club, day: event.day, time: event.time, venue: event.venue, teamSize: event.teamSize, description: event.description, status: event.status, eventCoordinator1: event.eventCoordinator1, eventCoordinator2: event.Coordinator2 }})
  .exec(callback);
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
