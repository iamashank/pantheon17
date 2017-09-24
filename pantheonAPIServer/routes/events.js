//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Event = require('../models/event');


//register
router.post('/addNewEvent', (req, res, next) => {
  console.log('yes');
  Event.getEventCount((err, data) => {
    if (err) {
      console.log(`Error fetchoing events count`);
      res.json({
        success: false,
        msg: `Something went wrong... please try again.`,
      });
    } else {
      let count = data+1;
      const newEvent = new Event({
        eventId: count,
        name: req.body.name,
        club: req.body.club,
        teamSize: req.body.teamSize,
        description: req.body.description,
        day: req.body.day,
        venue: req.body.venue,
        eventCoordinator1: {
          name: req.body.eventCoordinator1Name,
          phoneNumber: req.body.eventCoordinator1PhoneNumber,
        },
        eventCoordinator2: {
          name: req.body.eventCoordinator2Name,
          phoneNumber: req.body.eventCoordinator2PhoneNumber,
        },
      });

      Event.addNewEvent(newEvent, (err, callback) => {
        if (err) {
          console.error(`Error adding event
            ${ err }`);
          res.json({
            success: false,
            msg: `Error adding event`,
          });
        } else {
          res.redirect('/addForm.html');
        }
      });
    }
  });
});

router.get('/getAllEvents', (req, res, next) => {
  Event.getAllEvents((err, data) => {
    if (err) {
      console.error(`Erorr fetching events`);
      res.json({
        success: false,
        msg: `Error fetching events`,
      });
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
