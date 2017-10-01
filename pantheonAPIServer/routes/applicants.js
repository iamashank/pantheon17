//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');
const nodemailer = require('nodemailer');
const Team = require('../models/team');
const request  = require('request');

//register
router.post('/register', (req, res, next) => {

  Applicant.verifyApplicant(req.body.email, req.body.phoneNumber, (err, data) => {
    if (err || data === null) {
      console.log(`Error: Could not verify the Applicant in register
        ${ err }`);
      res.json({
        success: false,
        msg: `Something went wrong`,
      });
    } else {

        if (data.registered === true) {
          return res.json({
            success: false,
            msg: `applicant already registered`,
          });
        }

        if (data.otpVerified === false) {
          return res.json({
            success: false,
            msg: `OTP not verified`,
          });
        }
        let payment = (req.body.collegeName === 'Birla Institute of Technology, Mesra');
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
          payment: {
            day1: payment,
            day2: payment,
            day3: payment,
          },
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
                  subject: 'Successful Registration', // Subject line
                  text: '', // plain text body
                  html: `
                  <h2 align="center">Pantheon BIT Mesra</h2>
                  <br>
                  <h3>Hi ${ applicant.name }</h3>
                  <p>You have successfully registered for Pantheon 2017, BIT Mesra. Further details regarding reporting time, payment and accomodation will be sent to you shortly.
                  Until then check out our events at www.pantheon17.in/events and get ready for an awesome weekend.</p>
                  <p><strong>Your School/College Name:- </strong> ${ applicant.collegeName }<br>
                  <strong> Pantheon ID:- </strong> ${ applicant.id }</p>

                  <p>For queries regarding Pantheon contact <br>
                  Samadrito Bose - +91-7292887967 <br>
                  Or mail us at - webteam@pantheon17.in
                  </p>

                  <p>With Regards,<br>Pantheon Web Team</p>`
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
                    msg: `Successfully registered applicant`,
                  });
                }
              });
          });
        }
      });
    }
  });
});


router.post('/verifyOtp', (req, res, next) => {

  Applicant.verifyApplicant(req.body.email, req.body.phoneNumber, (err, data) => {
    if (err || data === null) {
      console.log(`Error: Could not verify the Applicant in verify otp
        ${ err }`);
      res.json({
        success: false,
        msg: `Applicant not Found`,
      });
    } else {
      if (data.registered === true) {
        return res.json({
          success: false,
          msg: `applicant already registered`,
        });
      }
      if (data.otp !== Number(req.body.otp)) {
        res.json({
          success: false,
          msg: `OTP invalid`,
        });
      } else {
        Applicant.verifyOtp(req.body.email, req.body.phoneNumber, (err, data) => {
          if (err) {
            console.error(`Error: Could not verify otp
              ${ err }`);
            return res.json({
              success: false,
              msg: `Something went wrong`,
            });
          } else {
            res.json({
              success: true,
              msg: `OTP Verified`,
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

    let otpUrl = `http://sms.digimiles.in/bulksms/bulksms?username=di78-pantheon&password=tandoori&type=0&dlr=1&destination=${ req.body.phoneNumber }&source=PANTHN&message=Your Pantheon registration OTP is: ${ OTP }`;

    // Save the user
    Applicant.getApplicantCount((err, data) => {
      let count = data;
      if (err) {
        console.error(`Error: Cannot get count of applicants
          ${ err }`);
        res.json({
        success: false,
          msg: `Something went wrong`,
        });
      } else {
        Applicant.verifyApplicant(req.body.email, req.body.phoneNumber, (err, data) => {
          if (err) {
            res.json({
              success: false,
              msg: `Something went wrong`,
            });
          } else {
            if (data === null) {
              const newApplicant = new Applicant({
                id: `PA17/${ 10000 + count }`,
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
            } else {
              if (data.registered === false) {
                Applicant.updateOtp(req.body.email, req.body.phoneNumber, OTP, (err, data) => {
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
              } else {
                res.json({
                  success: false,
                  msg: `applicant already registered`,
                });
              }
            }
          }
        });
      }
    });
  });
});

router.post('/verifyForApp', (req, res, next) => {

  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({
      success: false,
      msg: `Invalid Captcha`,
    });
  }

  let secretKey = "6LfkqTIUAAAAAGEmtHvj_hdK0tMoE605nlKt2n6E";

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

    let otpUrl = `http://sms.digimiles.in/bulksms/bulksms?username=di78-pantheon&password=tandoori&type=0&dlr=1&destination=${ req.body.phoneNumber }&source=PANTHN&message=Your Pantheon registration OTP is: ${ OTP }`;

    // Save the user
    Applicant.getApplicantCount((err, data) => {
      let count = data;
      if (err) {
        console.error(`Error: Cannot get count of applicants
          ${ err }`);
        res.json({
        success: false,
          msg: `Something went wrong`,
        });
      } else {
        Applicant.verifyApplicant(req.body.email, req.body.phoneNumber, (err, data) => {
          if (err) {
            res.json({
              success: false,
              msg: `Something went wrong`,
            });
          } else {
            if (data === null) {
              const newApplicant = new Applicant({
                id: `PA17/${ 10000 + count }`,
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
            } else {
              if (data.registered === false) {
                Applicant.updateOtp(req.body.email, req.body.phoneNumber, OTP, (err, data) => {
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
              } else {
                res.json({
                  success: false,
                  msg: `applicant already registered`,
                });
              }
            }
          }
        });
      }
    });
  });
});


router.get('/getAllApplicants', (req, res, next) => {
  Applicant.getAllApplicants((err, data) => {
    if (err) {
      console.error(`Erorr fetching Applicants
        ${ err }`);
      res.json({
        success: false,
        msg: `Error fetching Applicants`,
      });
    } else {
      res.send(data);
    }
  });
});

router.get('/getApplicantCount', (req, res, next) => {
  Applicant.getApplicantCount((err, data) => {
    if (err) {
      console.log(`Error fetching applicant count
        ${ err }`);
      res.send({
        success: false,
        msg: `Something went wrong`,
      });
    } else {
      res.json({
        success: true,
        count: data,
      });
    }
  });
});

router.post('/getApplicantById', (req, res, next) => {
  Applicant.getApplicantById(req.body.id, (err, data) => {
    if (err) {
      console.error(`Error getting applicant by id
        ${ err }`);
      res.json({
        success: false,
        msg: `Error getting applicant`,
      });
    } else {
      if (data === null) {
        res.json({
          success: false,
          msg: `Applicant not found`,
        });
      } else {
        res.json({
          success: true,
          data: data,
        });
      }
    }
  });
});

router.post('/verifyApplicantForApp', (req, res, callback) => {
  Applicant.verifyForTeam(req.body.id, req.body.email, (err, data) => {
    if (err) {
      console.error(`Could not verify team
        ${ err }`);
      return res.json({
        success: false,
        statusCode: 100,
      });
    } else {
      if (data === null) {
        return res.json({
          success: false,
          statusCode: 404,
        });
      }
      res.json({
        success: true,
        data: data,
      });
    }
  });
});

router.post('/getApplicantsByTeam', (req, res, next) => {
  Team.getTeam(req.body.eventName, req.body.teamName, (err, data) => {
    if (err) {
      console.error(`Error getting team
        ${ err }`);
      res.json({
        success: false,
        msg: `Something went wrong`,
      });
    } else {
      const points = data.points;
      const wins = data.wins;
      Applicant.getApplicantsByTeam(req.body.eventName, req.body.teamName, (err, data) => {
        if (err) {
          console.error(`Error getting appliacants by teamName
            ${ err }`);
          res.json({
            success: false,
            msg: `Something went wrong`,
          });
        } else {
          res.json({
            success: true,
            eventName: req.body.eventName,
            teamName: req.body.teamName,
            points: points,
            wins: wins,
            members: data,
          });
        }
      });
    }
  });
});

router.post('/updatePayment', (req, res, next) => {
  Applicant.updatePayment(req.body, (err, data) => {
    if (err) {
      console.error(`Could not update payment`);
      return res.json({
        success: false,
        msg: `Error updating payment`,
      });
    }

    res.json({
      success: true,
      msg: `Successfully updated payment`,
    });
  });
});

module.exports = router;
