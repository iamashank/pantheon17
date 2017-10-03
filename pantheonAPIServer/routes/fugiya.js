//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Fugiya = require('../models/fugiya');
const nodemailer = require('nodemailer');
const multer  = require('multer');
const Applicant = require('../models/applicant');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/fugiya123');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname );
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
      console.log('image error');
      return res.redirect(`https://pantheon17.in/fugiya?error=2`);
    }

    if (data === null) {
      console.log('User does not exist');
      return res.redirect('https://pantheon17.in/fuigya?error=3');
    }

    const newParticipant = new Fugiya({
      id: data.id,
      name: data.name,
      rollNumber: data.rollNumber,
      collegeName: data.collegeName,
      phoneNumber: data.phoneNumber,
      tagline: req.body.tagline,
      email: data.email,
      photoUrl: req.file.path,
    });

    Fugiya.addParticipant(newParticipant, (err, data) => {
      if (err) {
        console.log(`Error adding participant in Fugiya
          ${ err }`);
        return res.redirect(`https://pantheon17.in/fugiya?error=1`);
      }
     res.redirect('https://pantheon17.in/fuigya?error=0');
    });
  });
});

router.get('/getAllPariticipants', (req, res, next) => {
  Fugiya.getAllPariticipants((err, data) => {
    res.send(data);
  });
});

module.exports = router;
