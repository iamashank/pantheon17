//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');
const request = require('request');

// add new announcement

router.post('/addAnnouncement', (req, res, next) => {
  const newAnnouncement = new Announcement({
    title: req.body.title,
    message: req.body.message,
  });

  Announcement.addAnnouncement((err, data) => {
    if (err) {
      console.error(`Erorr adding announcement
        ${ err }`);
      return res.json({
        success: false,
        msg: `Error adding announcement`,
      });
    }

    const options = {
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "key=AAAA02uI8uk:APA91bH9D5I5liEUDWTv81eTHbhLd4EtaNaRr40g5l6YBABhzL4xynhK7jTEMtyaCtIstRPnxV2IjYQyo2JBk5mlVdY3gKfnyVY5vZrPQHhvV1GCLzKlpC-z9nXuryYyu_J-OHbD6uUO"
      },
      url: "https://fcm.googleapis.com/fcm/send",
      method: 'post',
      json: true,
      body: {
        "to" : "/topics/global",
        "data" : {
          "is_announcement" : true,
          "title" : `"${ req.body.title }"`,
          "message" : `"${ req.body.message }"`,
          "timestamp" : Date.now(),
          "eventId" : `"2"`,
        },
        "time_to_live" : 600
      },
    };

    request(options, (err, result, body) => {
      if (err) {
        res.json({
          success: false,
          msg: `Error adding announcement`
        });
      } else {
          res.redirect('https://pantheon17.in/admin897798/adminPage');
      }
    });

  });
});

router.get('/getAnnouncemnts', (req, res, next) => {
  Announcement.getAnnouncemnts((err, data) => {
    if (err) {
      console.log(`Error fetching announcements`);
      return res.json({
        success: false,
        msg: `Error fetching announcements`,
      });
    }

    res.send(data);
  });
});

module.exports = router;
