//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Fugiya = require('../models/fugiya');
const nodemailer = require('nodemailer');
const multer  = require('multer');
const Applicant = require('../models/applicant');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/fugiya123');
  },
  filename: function (req, file, cb) {
    cb(null, "fugiya-" + Date.now());
  }
});

function filterImage(req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
    req.imageError = true;
    return cb(null, false);
  }
  cb(null, true);
}

let upload = multer({ storage: storage, fileFilter: filterImage });

router.post('/addParticipant', upload.single('avatar'), (req, res, next) => {
  console.log(req.body);
  Applicant.verifyForTeam(req.body.id, req.body.email, (err, data) => {
    if (err) {
      console.log(`Error verifying team in Fugiya
        ${ err }`);
      return res.redirect(`https://pantheon17.in/fugiya?error=1`);
    }

    if (req.imageError) {
      console.log('image format error');
      return res.redirect(`https://pantheon17.in/fugiya?error=2`);
    }

    if (data === null) {
      console.log('Applicant not found');
      return res.redirect('https://pantheon17.in/fugiya?error=3');
    }

    const newParticipant = new Fugiya({
      id: data.id,
      name: data.name,
      rollNumber: data.rollNumber,
      collegeName: data.collegeName,
      phoneNumber: data.phoneNumber,
      tagline: req.body.tagline,
      email: data.email,
      photoUrl: `images/fugiya123/${req.file.filename}`,
    });

    const participant = {
      id: data.id,
      name: data.name,
      rollNumber: data.rollNumber,
      collegeName: data.collegeName,
      phoneNumber: data.phoneNumber,
      tagline: req.body.tagline,
      email: data.email,
      photoUrl: `images/fugiya123/${req.file.filename}`,
    };

    Fugiya.checkParticipant(req.body.id, req.body.email, (err, data) => {

      if (data !== null) {
        return res.redirect('https://pantheon17.in/fugiya?error=4');
      }

      Fugiya.addParticipant(newParticipant, (err, data) => {
        if (err) {
          console.log(`Error adding participant in Fugiya
            ${ err }`);
          return res.redirect(`https://pantheon17.in/fugiya?error=1`);
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
              subject: 'Fugiya - Pantheon', // Subject line
              text: '', // plain text body
              html: `
              <h2 align="center">Fugiya - Pantheon BIT Mesra</h2>
              <br>
              <h3>Hi ${ participant.name }</h3>
              <p>Kudos for participating in Fugiya'17. You have successfully submitted your entry. If selected for further rounds, you'll be contacted. Do go through all the information given at www.pantheon17.in/fugiya</p>
              <p align="center"><b>All the very best!</b></p>

              <p>For further queries contact <br>
              Nikita - +91-9471786154 <br>
              Or mail us at - webteam@pantheon17.in
              </p>

              <p>With Regards,<br>Pantheon Web Team</p>` // html body
          };
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.log(`Could not send mail
                    ${ error }`);
                  return res.redirect(`https://pantheon17.in/fugiya?error=1`);
              } else {
                 res.redirect('https://pantheon17.in/fugiya?error=0');
              }
          });
        });
      });
    });
  });
});

router.get('/getAllPariticipants', (req, res, next) => {
  Fugiya.getAllPariticipants((err, data) => {
    res.send(data);
  });
});

module.exports = router;
