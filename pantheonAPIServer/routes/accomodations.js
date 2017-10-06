//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const Accomodation = require('../models/accomodation');
const Applicants = require('../models/applicants');

// add new accomodation

router.post('/addAccomodation', (req, res, next) => {

  Applicants.verifyForTeam(req.body.id, req.body.email, (err, data) => {
    if (err) {
      console.log(`Error verifying applicant in accomodation`);
      return res.json({
        success: false,
        msg: `Something went wrong`,
      });
    }

    if (data === null) {
      return res.json({
        success: false,
        msg: `Applicant not found`,
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
      city: data.city,
      state: data.state,
      rollNumber: data.rollNumber,
    });

    Accomodation.addAccomodation(newAccomodation, (err, data) => {
      if (err) {
        return res.json({
          success: false,
          msg: `Something went wrong`,
        });
      }

      return res.json({
        success: true,
        msg: `Successfully registered for accomodation`,
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
