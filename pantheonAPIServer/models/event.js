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
  // Event status example 2 - cancelled
  status: {
    type: Number,
  },
  position1: {
    teamId: {
      type: String,
    },
    points: {
      type: Number
    }
  },
  position2: {
    teamId: {
      type: String,
    },
    points: {
      type: Number
    }
  },
  position3: {
    teamId: {
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

module.exports.getAllEvents = function(callback) {
  Event.find().exec(callback);
};

module.exports.getEventCount = function(callback) {
  Event.count({}, callback);
};


module.exports.getEventById = function(id, callback) {
  Event.findOne({ eventId: id }, callback);
};
