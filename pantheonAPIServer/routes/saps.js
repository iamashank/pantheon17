//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const SAP = require('../models/sap');
const nodemailer = require('nodemailer');


//register
router.post('/register', (req, res, next) => {
  SAP.getCount((err, data) => {
    if (err) {
      console.error(`Error getting count of SAPS
        ${ err }`);
      res.json({
        success: false,
        msg: `Something went wrong`,
      });
    } else {
      let newSAP = new SAP({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.email,
        collegeName: req.body.collegeName,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3,
        answer4: req.body.answer4,
        answer5: req.body.answer5,
        sapId: `PA17/SAP/${ 1000 + data }`,
        gender: req.body.gender,
      });
      SAP.addNewSAP(newSAP, (err, data) => {
        if (err) {
          console.error(`Error registering SAP
            ${ err }`);
          res.json({
            success: false,
            msg: `Error registering SAP`,
          });
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
                to: `${ newSAP.email }`, // list of receivers
                subject: 'Student Ambassador Program', // Subject line
                text: '', // plain text body
                html: `
                <h2 align="center">Student Ambassador Program - Pantheon BIT Mesra</h2>
                <br>
                <h3>Hi ${ newSAP.name }</h3>
                <p>You have successfully registered for Student Ambassador Program for Pantheon17 BIT Mesra.</p>
                <p><strong>College:- </strong> ${ newSAP.collegeName }<br>
                <strong>SAP ID:- </strong> ${ newSAP.sapId }</p>
                <p> Go through all the rules and information given at www.pantheon17.in/sap </p>

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
                    res.json({
                      success: false,
                      msg: `Something went wrong`,
                    });
                } else {
                  res.json({
                    success: true,
                    id: newSAP.sapId,
                    mas: `Successfully registered sap`,
                  });
                }
            });
          });
        }
      });
    }
  });
});

router.get('/getAllSAPS', (req, res, next) => {
  SAP.getAllSAPS((err, data) => {
    if (err) {
      console.error(`Erorr fetching SAPS
        ${ err }`);
      res.json({
        success: false,
        msg: `Error fetching saps`,
      });
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
