//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Accomodation = require('../models/accomodation');
const Applicants = require('../models/applicant');
const nodemailer = require('nodemailer');

// add new accomodation
router.post('/addAccomodation', (req, res, next) => {

  Applicants.verifyForTeam(req.body.id, req.body.email, (err, data) => {
    if (err) {
      console.log(`Error verifying applicant in accomodation`);
      return res.json({
        success: false,
        statusCode: 100,
        msg: `Something went wrong`,
      });
    }

    if (data === null) {
      return res.json({
        success: false,
        statusCode: 404,
        msg: `Applicant not found`,
      });
    }

    Accomodation.checkAccomodation(req.body.id, (err, data) =>{
      if (err) {
        return res.json({
          success: false,
          statusCode: 100,
          msg: `Something went wrong`,
        });
      }

      if (data !== null) {
        return res.json({
          success: false,
          statusCode: 300,
          msg: `Applicant already registered`,
        });
      }

      const newAccomodation = new Accomodation({
        id: data.id,
        name: data.name,
        gender: data.gender,
        email: data.email,
        phoneNumber: data.phoneNumber,
        collegeName: data.collegeName,
        year: data.year,
        city: req.body.city,
        tickets: req.body.tickets,
        arrivalDateAndTime: req.body.arrivalTime,
        sapName: req.body.sapName,
        sapId: req.body.sapId,
        state: data.state,
        rollNumber: data.rollNumber,
      });

      let applicantName = data.name;

      Accomodation.addAccomodation(newAccomodation, (err, data) => {
        if (err) {
          return res.json({
            success: false,
            statusCode: 100,
            msg: `Something went wrong`,
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
              to: `${ req.body.email }`, // list of receivers
              subject: 'Successful Registration', // Subject line
              text: '', // plain text body
              html: `
              <h2 align="center">Accommodation - Pantheon</h2>
              <br>
              <h3>Hi ${ applicantName }</h3>

              <p>You have successfully registered for accommodation in Pantheon 2017, BIT Mesra. Our Hospitality Team will contact you regarding any further details</p>

              <p>For any queries contact <br>
              Hospitality Team - <br>
              Kunal Gourav - +91-9102282893 <br>
              Abhayankar Joshi - +91-8235483269 <br>
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
                    statusCode: 100,
                    msg: `Something went wrong`,
                  });
              } else {
              return res.json({
                success: true,
                msg: `Successfully registered for accomodation`,
              });
            }
          });
        });
      });
    });
  });
});

router.get('/getAccomodationList', (req, res, next) => {
  Accomodation.getAccomodationList((err, data) =>{
    res.send(data);
  });
});


module.exports = router;
