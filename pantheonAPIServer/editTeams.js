//jshint esversion:6, node: true

"use strict";

const request = require('request');

let first = 0;
let second = 0;
let third = 0;

request('https://pantheon17.in/api/applicants/getAllApplicants', (error, response, data) => {
  data = JSON.parse(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i].codezilla) {
      if (data[i].year === '1') {
        ++first;
      }
      if (data[i].year === '2') {
        ++second;
      }
      if (data[i].year === '3') {
        ++third;
      }
    }
  }

  console.log(`


    -- Codezilla Participation Statistics --
    
    1st Year - ${ first },
    2nd Year - ${ second },
    3rd Year - ${ third },


    `);
});
