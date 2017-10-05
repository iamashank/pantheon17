//jshint esversion:6, node: true

"use strict";
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const request = require('request');

router.post('/sendEmail', (req, res, next) => {
  request.post({url:'http://pantheon17.in:8000/applicants/getApplicantById', form: { id: req.body.id }}, function(err, httpResponse, body){
    const applicant = JSON.parse(body).data;
    console.log(applicant);
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
  });
});

module.exports = router;
