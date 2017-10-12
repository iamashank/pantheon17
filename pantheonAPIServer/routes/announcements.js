//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');
const request = require('request');

// add new announcement

router.post('/addAnnouncement', (req, res, next) => {
  const currentDate = Date.now();
  const newAnnouncement = new Announcement({
    title: req.body.title,
    message: req.body.message,
    date: currentDate,
  });

  Announcement.addAnnouncement(newAnnouncement, (err, data) => {
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
        "to" : "cKt5uMqBh_g:APA91bFiTcz6Ksn0m4HpnN61zWYeUvupL4ZKXrbaKPBCGDKPXZdfStHNOxRBLGPPjdmjY_ThFcLEjU3cZKnhRmL_Oasba_MbET9ev1UTBNKvLJe5iqrX6uKIafitAmiiLCJrC-VmTLGh",
        "data" : {
          "updateCode" : 0,
          "title" : `"${ req.body.title }"`,
          "message" : `"${ req.body.message }"`,
          "timestamp" : currentDate,
          "eventId" : `"2"`,
        },
        "time_to_live" : 86400
      },
    };

    request(options, (err, result, body) => {
      if (err) {
        res.json({
          success: false,
          msg: `Error adding announcement`
        });
      } else {
          res.redirect('https://pantheon17.in/admin897798/adminPage.php');
      }
    });

  });
});

router.get('/getAnnouncements', (req, res, next) => {
  Announcement.getAnnouncements((err, data) => {
    if (err) {
      console.log(`Error fetching announcements
        ${ err }`);
      return res.json({
        success: false,
        msg: `Error fetching announcements`,
      });
    }
    res.send(data);
  });
});

router.post('/getAnnouncementsByTime', (req, res, next) => {
  Announcement.getAnnouncementsByTime(req.body.time, (err, data) => {
    if (err) {
      console.error(`Error fetching announcements by time`);
      return res.json({
        success: false,
        msg: `Error fetching data`
      });
    }
    return res.json({
      success: true,
      data: data,
    });
  });
});

module.exports = router;
