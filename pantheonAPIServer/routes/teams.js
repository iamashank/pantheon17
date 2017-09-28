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

      console.log(members);

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
          console.log(err);
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
                      subject: 'Event Registration - Pantheon 17', // Subject line
                      text: '', // plain text body
                      html: `
                      <h2 align="center">Event Registration - Pantheon BIT Mesra</h2>
                      <br>
                      <h3>Hi ${ data.name }</h3>

                      <p>You have successfully registered for the event '${ eventNames[req.body.eventName] }' as team '${ req.body.teamName }'. Make sure you
                      read all the rules and instructions given on the event page.  For further information contact the event coordinators.</p>

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
              }
            });
          }, (err) => {
            if (err) {
              return res.json({
                success: false,
                statusCode: 100,
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
                  statusCode: 100,
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
