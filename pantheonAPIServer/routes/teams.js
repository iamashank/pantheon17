//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const nodemailer = require('nodemailer');
const request  = require('request');
const Applicant = require('../models/applicant');
const async = require('async');

const eventNames = {
  droidtrooper: 'Droid Trooper',
  illuminati: 'Illuminati',
  codezilla: 'CodeZilla',
  cyberbrigeton: 'CyberBridgeton',
  formalinformal: 'Formal and Informal',
  eureka: 'Eureka',
};

//register
router.post('/register', (req, res, next) => {
  if (req.body.teamMembers.length === 0) {
    return res.json({
      success: false,
      msg:`Empty Member Array`,
    });
  }

  Team.verifyTeam(req.body.eventName, req.body.teamName, (err, data) => {
    if (err) {
      console.error(`Could not verify team
        ${ err }`);
      return res.json({
        success: false,
        statusCode: 100,
      });
    } else {

      if (data !== null) {
        return res.json({
          success: false,
          statusCode: 401,
        });
      }

      const newTeam = new Team({
        teamName: req.body.teamName,
        eventName: req.body.eventName,
      });

      let members = req.body.teamMembers;
      let unique = true;

      for(let i = 0; i < members.length; i++) {
        for(let j = i+1; j < members.length; j++) {
          if (members[i].id === members[j].id) {
            unique = false;
            break;
          }
        }
        if (!unique) {
          break;
        }
      }

      if (!unique) {
        return res.json({
          success: false,
          statusCode: 300,
        });
      }

      async.each(req.body.teamMembers, (member, callback) => {
        Applicant.verifyForTeam(member.id, member.email, (err, data) => {
          if (err) {
            console.log(`Erorr verifying memebers
              ${ err }`);
            callback({ statusCode: 100, id: null });
          } else {
            if (data === null) {
              callback({ statusCode: 404, id: member.id});
            } else {
              if (data[req.body.eventName]) {
                callback({ statusCode: 402, id: member.id });
              } else {
                callback();
              }
            }
          }
        });
      }, (err) => {
        if (err) {
          return res.json({
            success: false,
            statusCode: err.statusCode,
            id: err.id,
          });
        } else {
          async.each(req.body.teamMembers, (member, callback) => {
            Applicant.registerTeam(member.id, req.body.teamName, req.body.eventName, (err, data) => {
              if (err) {
                console.error(`Error registering member
                  ${ err }`);
                callback(err);
              } else {
                callback();
              }
            });
          }, (err) => {
            if (err) {
              return res.json({
                success: false,
                statusCode: 100,
              });
            }

            let memberMailString = '';
            for(let i = 0; i < req.body.teamMembers.length; i++) {
              memberMailString  += " " + req.body.teamMembers[i].id + ",";
            }

            memberMailString = memberMailString.slice(0, -1) + '.';

            Applicant.getApplicantById(req.body.teamMembers[0].id, (err, data) => {
              if (err) {
                return res.json({
                  success: false,
                  statusCode: 100,
                });
              }

              nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.pantheon17.in',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'webteam@pantheon17.in', // generated ethereal user
                        pass: 'S^vZMv)0'  // generated ethereal password
                    },
                    tls: {
                      rejectUnauthorized: false
                    },
                });
                let mailOptions = {
                    from: '"Pantheon Web Team" <webteam@pantheon17.in>', // sender address
                    to: `${ data.email }`, // list of receivers
                    subject: 'Event Registration - Pantheon 17', // Subject line
                    text: '', // plain text body
                    html: `
                    <h2 align="center">Event Registration - Pantheon BIT Mesra</h2>
                    <br>
                    <h3>Hi ${ data.name }</h3>

                    <p>Your team '${ req.body.teamName }' has successfully registered for the event '${ eventNames[req.body.eventName] }'. Pantheon ID's of the members are -${ memberMailString } Make sure you
                    read all the rules and instructions given on the event page. For further information contact the event coordinators.</p>

                    <p>For queries regarding Pantheon contact <br>
                    Samadrito Bose - +91-7292887967 <br>
                    Or mail us at - webteam@pantheon17.in
                    </p>

                    <p>With Regards,<br>Pantheon Web Team</p>` // html body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      console.log(`Could not send mail
                      ${ error }`);
                      return res.json({
                        success: false,
                        statusCode: 100,
                      });
                  } else {
                    Team.addTeam(newTeam, (err, data) => {
                      if (err) {
                        console.error(`Error Adding team
                          ${ err }`);
                        return res.json({
                          success: false,
                          msg: `Something went wrong`,
                        });
                      } else {
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
                              "updateCode" : 3,
                              "title" : `"New Team Registered"`,
                              "message" : `"New Team has been registered"`,
                              "timestamp" : Date.now(),
                              "eventId" : `"0"`,
                              "eventName": `"${req.body.eventName}"`,
                              "teamName": `"${req.body.teamName}"`,
                            },
                            "time_to_live" : 86400
                          },
                        };

                        request(options, (err, result, body) => {
                          if (err) {
                            res.json({
                              success: false,
                              msg: `Error registering team`
                            });
                          } else {
                            res.json({
                              success: true,
                              statusCode: 100,
                            });
                          }
                        });
                      }
                    });
                  }
                });
              });
            });
          });
        }
      });
    }
  });
});

router.get('/getAllTeams', (req, res, body) => {
  Team.getAllTeams((err, data) => {
    if (err) {
      console.error(`Error fetching all teams`);
    } else {
      res.send(data);
    }
  });
});

router.get('/getLeaderboard', (req, res, body) => {
  Team.getLeaderboard((err, data) => {
    res.send(data);
  });
});

module.exports = router;
