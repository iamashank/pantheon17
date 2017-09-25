//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');
const nodemailer = require('nodemailer');
const request  = require('request');

//register
router.post('/register', (req, res, next) => {

  // Verify Applicant
  Applicant.verifyApplicant(req.body.name, req.body.email, (err, data) => {
    if (err || !data) {
      console.log(`Error: Could not verify the Applicant
        ${ err }`);
      res.json({
        success: false,
        msg: `Something went wrong`,
      });
    } else {

      // Compare OTP
      if (Number(data.otp) !== req.body.otp) {
        res.json({
          success: false,
          msg: `OTP invalid`,
        });
      } else {
        const applicant = new Applicant({
          otp: data.otp,
          id: data.id,
          name: req.body.name,
          gender: req.body.gender,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          collegeName: req.body.collegeName,
          year: req.body.year,
          city: req.body.city,
          state: req.body.state,
          rollNumber: req.body.rollNumber,
        });

        // Update Applicant data
        Applicant.updateApplicant(applicant, (err, data) => {
          if (err) {
            console.error(`Error adding Applicant
              ${ err }`);
            res.json({
              success: false,
              msg: `Error adding Applicant`,
            });
          } else {

            // Send Mail
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
                  subject: 'Pantheon BIT Mesra Registration', // Subject line
                  text: '', // plain text body
                  html: `
                  <h2 align="center">Pantheon BIT Mesra</h2>
                  <br>
                  <h3>Hi ${ applicant.name }</h3>
                  <p>You have successfully registered for Pantheon 2017, BIT Mesra. Check out the events page at pantheon17.in to register for our awesome events.</p>
                  <p><strong>Your College Name:- </strong> ${ applicant.collegeName }<br>
                  <strong> Pantheon ID:- </strong> ${ applicant.id }</p>
                  <p>For further queries contact: <br>
                  Samadrito Bose - +91-7292887967</p>
                  <p>With Regards,<br>Pantheon Web Team</p>` // html body
              };
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      console.log(`Could not send main
                        ${ error }`);
                      res.json({
                        success: false,
                        msg: `Something went wrong`,
                      });
                  } else {
                  res.json({
                    success: true,
                    id: applicant.id,
                    mas: `Successfully registered sap`,
                  });
                }
              });
            });
            res.json({
              success: true,
              msg: `Successfully registered applicant`,
            });
          }
        });
      }
    }
  });
});

router.post('/verify', (req, res, next) => {

  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({
      success: false,
      msg: `Invalid Captcha`,
    });
  }

  let secretKey = "6LezATIUAAAAANl7Dm5PpeilZ_pxo4JjaAATDzv6";

  let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  // Check captcha
  request(verificationUrl, function(error,response,body) {
    body = JSON.parse(body);
    if(body.success !== undefined && !body.success) {
      return res.json({
        success: false,
        msg: `Invalid Captcha`,
      });
    }

    // Generate OTP
    let OTP = Math.floor(100000 + Math.random() * 900000);

    let otpUrl = `http://sms.digimiles.in/bulksms/bulksms?username=di78-pantheon&password=digimile&type=0&dlr=1&destination=${ req.body.phoneNumber }&source=PANTHN&message=Your Pantheon registration OTP is: ${ OTP }`;

    // Save the user
    Applicant.getApplicantCount((err, data) => {
      if (err) {
        console.error(`Error: Cannot get count of applicants
          ${ err }`);
        res.json({
        success: false,
          msg: `Something went wrong`,
        });
      } else {
        const newApplicant = new Applicant({
          id: `PA17/${ 10000 + data }`,
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          otp: OTP,
        });

        Applicant.addNewApplicant(newApplicant, (err, data) => {
          if (err) {
            console.error(`Error: Error saving new applicant
              ${ err  }`);
            res.json({
              success: false,
              msg: `Something went wrong`,
            });
          } else {

            // Send OTP
            request(otpUrl, (error, response, body) => {
              if (error) {
                console.error(`Error: error sending OTP
                  ${ error }`);
                return res.json({
                  success: false,
                  msg: `Error sending OTP`,
                });
              } else {
                res.json({
                  success: true,
                  msg: `Completed stage one of registration`,
                });
              }
            });
          }
        });
      }
    });
  });
});



router.get('/getAllApplicants', (req, res, next) => {
  Applicant.getAllApplicants((err, data) => {
    if (err) {
      console.error(`Erorr fetching Applicants`);
      res.json({
        success: false,
        msg: `Error fetching Applicants`,
      });
    } else {
      res.send(data);
    }
  });
});

router.post('/getApplicantById', (req, res, next) => {
  Applicant.getApplicantById(req.body.id, (err, data) => {
    if (err) {
      console.error(`Error getting applicant by id
        ${ err }`);
      res.json({
        success: true,
        msg: `Successfully registered applicant`,
      });
    }
  });
});

module.exports = router;
