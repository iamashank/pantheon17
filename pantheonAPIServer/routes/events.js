//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const request = require('request');
const Announcement = require('../models/announcement');



router.post('/addNewEvent', (req, res, next) => {
  Event.getEventCount((err, data) => {
    if (err) {
      console.log(`Error fetching events count
        ${ err }`);
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
        time: req.body.time,
        venue: req.body.venue,
        status: req.body.status,
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
          res.redirect('https://pantheon17.in/admin897798/addEvent');
        }
      });
    }
  });
});


router.post('/editEvent', (req, res, next) => {
      const event = {
        eventId: req.body.id,
        name: req.body.name,
        club: req.body.club,
        teamSize: req.body.teamSize,
        description: req.body.description,
        day: req.body.day,
        time: req.body.time,
        venue: req.body.venue,
        status: req.body.status,
        eventCoordinator1: {
          name: req.body.eventCoordinator1Name,
          phoneNumber: req.body.eventCoordinator1PhoneNumber,
        },
        eventCoordinator2: {
          name: req.body.eventCoordinator2Name,
          phoneNumber: req.body.eventCoordinator2PhoneNumber,
        },
      };

      Event.editEvent(event, (err, callback) => {
        if (err) {
          console.error(`Error editing event
            ${ err }`);
          res.json({
            success: false,
            msg: `Error editing event`,
          });
        } else {
          const newAnnouncement = new Announcement({
            title: `${ req.body.name } Event Updated`,
            message: req.body.editMessage,
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
                  "is_announcement" : false,
                  "title" : `"${ req.body.name }"`,
                  "message" : `"${ req.body.editMessage }"`,
                  "timestamp" : Date.now(),
                  "eventId" : `"${req.body.id}"`,
                },
                "time_to_live" : 600
              },
            };


            request(options, (err, result, body) => {
              if (err) {
                res.json({
                  success: false,
                  msg: `Error editing event`
                });
              } else {
                  res.redirect('https://pantheon17.in/admin897798/editEvent');
              }
            });
          });
        }
      });
});

router.get('/getAllEvents', (req, res, next) => {
  Event.getAllEvents((err, data) => {
    if (err) {
      console.error(`Erorr fetching events
        ${ err }`);
      res.json({
        success: false,
        msg: `Error fetching events`,
      });
    } else {
      res.send(data);
    }
  });
});

router.post('/getEventById', (req, res, next) => {
  Event.getEventById(req.body.id, (err, data) => {
    if (err) {
      console.error(`Error feching event by id
        ${ err }`);
      res.json({
        success: false,
        msg: `Error fetching team`,
      });
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
