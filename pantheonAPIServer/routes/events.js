//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const request = require('request');
const Announcement = require('../models/announcement');
const Team = require('../models/team');
const async = require('async');
const Applicant = require('../models/applicant');
const nodemailer = require('nodemailer');



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
          res.redirect('https://pantheon17.in/admin897798/addEvent.php');
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
                "to" : "/topics/global",
                "data" : {
                  "updateCode" : 1,
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
                  res.redirect('https://pantheon17.in/admin897798/editEvent.php');
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

router.post('/updateResults', (req, res, next) => {
  console.log(req.body);
  Event.updateResults(req.body, (err, data) => {
    if (err) {
      console.error(`Error updating event results
        ${ err }`);
      return res.json({
        success: false,
        msg: `Something went wrong`,
      });
    }
    console.log(data);

    console.log(`Updated results in event collection`);

    const actualName = data.name;
    let eventName = "";

    if( Number(req.body.eventId) >=2 && Number(req.body.eventId) <= 46) {
       eventName = 'formalinformal';
     } else {
        if (Number(req.body.eventId) === 1) {
          eventName = 'illuminati';
        } else {
          if (Number(req.body.eventId) === 47) {
            eventName = 'codezilla';
          } else {
            if (Number(req.body.eventId) === 48) {
              eventName = 'eureka';
            } else {
              if (Number(req.body.eventId) === 49) {
                eventName = 'droidtrooper';
              } else {
                if (Number(req.body.eventId) === 50) {
                  eventName = 'cyberbrigeton';
                }
              }
            }
          }
        }
      }

    Team.updatePoints(eventName, req.body.winner1, Number(req.body.points1), { eventId: req.body.eventId, position: 1, points: Number(req.body.points1) }, (err, data) => {
      if (err) {
        console.error(`Error updating winner 1
          ${ err }`);
        return res.json({
          success: false,
          msg: `Something went wrong`,
        });
      }

      if (data === null) {
        console.log(data);
        console.error(`Error updating winner 1`);
        return res.json({
          success: false,
          msg: `Team 1 not found`,
        });
      }

      console.log(`Updated results for team 1`);

      Team.updatePoints(eventName, req.body.winner2, Number(req.body.points2), { eventId: req.body.eventId, position: 2, points: Number(req.body.points2) }, (err, data) => {
        if (err) {
          console.error(`Error updating winner 2
            ${ err }`);
          return res.json({
            success: false,
            msg: `Something went wrong`,
          });
        }

        if (data === null) {
          console.error(`Error updating winner 1
            ${ err }`);
          return res.json({
            success: false,
            msg: `Team 2 not found`,
          });
        }

        console.log(`Updated results for team 2`);

        Team.updatePoints(eventName, req.body.winner3, Number(req.body.points3), { eventId: req.body.eventId, position: 3, points: Number(req.body.points3) }, (err, data) => {
          if (err) {
            console.error(`Error updating winner 3
              ${ err }`);
            return res.json({
              success: false,
              msg: `Something went wrong`,
            });
          }

          if (data === null) {
            console.error(`Error updating winner 1
              ${ err }`);
            return res.json({
              success: false,
              msg: `Team 3 not found`,
            });
          }

          console.log(`Updated results for team 3`);

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
                "updateCode" : 2,
                "title" : `"Results for event  ${ actualName }"`,
                "message" : `"Results for event ${ actualName } are as follows, 1st - Team ${ req.body.winner1 }, 2nd - Team ${ req.body.winner2 },  3rd - Team ${ req.body.winner3 }"`,
                "timestamp" : Date.now(),
                "eventId" : `"${ req.body.eventId }"`,
              },
              "time_to_live" : 600
            },
          };

          request(options, (err, result, body) => {
            if (err) {
              res.json({
                success: false,
                msg: `Error sending push notification`
              });
            } else {

              console.log(`Push notification sent`);

              Applicant.getApplicantsByTeam(eventName, req.body.winner1, (err, data) => {
                if (err) {
                  console.error(`Error getting applicants by team for winner1
                    ${ err }`);
                  return res.json({
                    success: false,
                    msg: `Error sending mails`
                  });
                }

                async.each(data, (applicant, callback) => {
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
                        to: `${ applicant.email }`, // list of receivers
                        subject: 'Congratulations!', // Subject line
                        text: '', // plain text body
                        html: `
                        <h2 align="center">Results for event ${ actualName }</h2>
                        <br>
                        <h3>Hi ${ applicant.name }</h3>

                        <p>The results for the event ${ actualName } have been announced and we are gald to notify you
                        that your team ${ req.body.winner1 } has secured the <b>1st position</b>. Details regarding certificates and
                        prizes will be announced shortly.
                        </p>

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
                          callback(error);
                      } else {
                        callback();
                      }
                    });
                  });
                }, (err) => {
                  if (err) {
                    return res.json({
                      success: false,
                      msg: `Error sending data`,
                    });
                  }

                  console.log(`Mail sent to team 1`);

                  Applicant.getApplicantsByTeam(eventName, req.body.winner2, (err, data) => {
                    if (err) {
                      console.error(`Error getting applicants by team for winner1
                        ${ err }`);
                      return res.json({
                        success: false,
                        msg: `Error sending mails`
                      });
                    }

                    async.each(data, (applicant, callback) => {
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
                            to: `${ applicant.email }`, // list of receivers
                            subject: 'Congratulations!', // Subject line
                            text: '', // plain text body
                            html: `
                            <h2 align="center">Results for event ${ actualName }</h2>
                            <br>
                            <h3>Hi ${ applicant.name }</h3>

                            <p>The results for the event ${ actualName } have been announced and we are gald to notify you
                            that your team ${ req.body.winner2 } has secured the <b>2nd position</b>. Details regarding certificates and
                            prizes will be announced shortly.
                            </p>

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
                              callback(error);
                          } else {
                            callback();
                          }
                        });
                      });
                    }, (err) => {
                      if (err) {
                        return res.json({
                          success: false,
                          msg: `Error sending data`,
                        });
                      }

                      console.log(`Mail sent to team 2`);

                      Applicant.getApplicantsByTeam(eventName, req.body.winner3, (err, data) => {
                        if (err) {
                          console.error(`Error getting applicants by team for winner1
                            ${ err }`);
                          return res.json({
                            success: false,
                            msg: `Error sending mails`
                          });
                        }

                        async.each(data, (applicant, callback) => {
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
                                to: `${ applicant.email }`, // list of receivers
                                subject: 'Congratulations!', // Subject line
                                text: '', // plain text body
                                html: `
                                <h2 align="center">Results for event ${ actualName }</h2>
                                <br>
                                <h3>Hi ${ applicant.name }</h3>

                                <p>The results for the event ${ actualName } have been announced and we are gald to notify you
                                that your team ${ req.body.winner3 } has secured the <b>3rd position</b>. Details regarding certificates and
                                prizes will be announced shortly.
                                </p>

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
                                  callback(error);
                              } else {
                                callback();
                              }
                            });
                          });
                        }, (err) => {
                          if (err) {
                            return res.json({
                              success: false,
                              msg: `Error sending data`,
                            });
                          }
                          console.log(`successfully updated results for event ${ actualName }`);
                          res.redirect("https://pantheon17.in/admin897798/adminPage.php");
                        });
                      });
                    });
                  });
                });
              });
            }
          });
        });
      });
    });
  });
});


module.exports = router;
