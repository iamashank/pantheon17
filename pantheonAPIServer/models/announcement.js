//jshint esversion:6, node: true

"use stcict";

const mongoose = require('mongoose');

// Team Schema
const AnnouncementSchema = mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },

});

const Announcement = module.exports = mongoose.model('Announcement', AnnouncementSchema);


module.exports.addAnnouncement = function(newAnnouncement, callback) {
  newAnnouncement.save(callback);
};

module.exports.getAnnouncemnts = function(callback) {
  Announcement.find().sort('-date').limit(30).exec(callback);
};
