//jshint esversion:6, node: true

"use strict";

const express = require('express');
const router = express.Router();
const SAP = require('../models/sap');


//register
router.post('/register', (req, res, next) => {
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
  });

  console.log('yes');

  SAP.addNewSAP(newSAP, (err, callback) => {
    if (err) {
      console.error(`Error registering SAP
        ${ err }`);
      res.json({
        success: false,
        msg: `Error registering SAP`,
      });
    } else {
      res.json({
        success: true,
        msg: `Successfully received data`,
      });
    }
  });
});

router.get('/getAllSAPS', (req, res, next) => {
  SAP.getAllSAPS((err, data) => {
    if (err) {
      console.error(`Erorr fetching SAPS`);
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
