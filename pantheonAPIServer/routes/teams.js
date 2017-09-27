//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const nodemailer = require('nodemailer');
const request  = require('request');
const Applicant = require('../models/applicant');
const async = require('async');

//register
router.post('/register', (req, res, next) => {

  Team.verifyTeam(req.body.eventName, req.body.teamName, (err, data) => {
    if (err) {
      console.error(`Could not verify team
        ${ err }`);
      return res.json({
        success: false,
        msg: `Something went wrong`,
      });
    } else {
      if (data !== null) {
        return res.json({
          success: false,
          msg: `already registered`,
        });
      }

      const newTeam = new Team({
        teamName: req.body.teamName,
        eventName: req.body.eventName,
      });

      let members = req.body.teamMembers;
      let unique = true;

      for(let i = 0; i < members.length; i++) {
        for(let j = 0; j < members.length; j++) {
          if (members[i].id === members[j].id) {
            unique = false;
            return;
          }
          if (!unique) {
            return;
          }
        }
      }

      if (!unique) {
        return res.json({
          success: false,
          msg: `Duplicates found`,
        });
      }

      async.each(req.body.teamMembers, (member, callback) => {
        Applicant.verifyForTeam(member.id, member.email, (err, data) => {
          if (err) {
            console.log(`Erorr verifying memebers
              ${ err }`);
            callback(`Something went wrong`);
          } else {
            if (data === null) {
              callback(`Member ${ member.id } not found`);
            } else {
              callback();
            }
          }
        });
      }, (err) => {
        if (err) {
          return res.json({
            success: false,
            msg: err,
          });
        } else {
          async.each(req.body.teamMembers, (member, callback) => {
            Applicant.registerTeam(member.id, req.body.teamName, req.body.eventName, (err, data) => {
              if (err) {
                console.error(`Error registering member
                  ${ err }`);
                callback(err);
              } else {
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
                      to: `${ member.email }`, // list of receivers
                      subject: 'Student Ambassador Program', // Subject line
                      text: '', // plain text body
                      html: `
                      <h2 align="center">Event Registration - Pantheon BIT Mesra</h2>
                      <br>
                      <h3>Hi ${ data.name }</h3>
                      <p>You have successfully registered for the event ${ req.body.eventName }</p>
                      <p>For further queries contact: <br>
                      Samadrito Bose - +91-7292887967</p>
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
              }
            });
          }, (err) => {
            if (err) {
              return res.json({
                success: false,
                msg: `Error registering team`,
              });
            }

            Team.addTeam(newTeam, (err, data) => {
              if (err) {
                console.error(`Error Adding team
                  ${ err }`);
                return res.json({
                  success: false,
                  msg: `Something went wrong`,
                });
              } else {
                res.json({
                  success: true,
                  msg: `Successfully registered team`,
                });
              }
            });
          });
        }
      });
    }
  });
});

module.exports = router;
