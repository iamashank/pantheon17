//jshint esversion:6, node: true

"use strict";

const request = require('request');

request('http://pantheon17.in:8000/applicants/getAllApplicants', (error, response, data) => {
  const applicants = JSON.parse(data);
  request('http://pantheon17.in:8000/teams/getAllTeams', (error, response, data) => {
    const teams = JSON.parse(data);
    console.log(data);

    for(let i = 0; i < applicants.length; i++) {
      if (applicants[i].formalinformal) {
        var flag = false;
        for(let j = 0; j < teams.length; j++) {
          if (teams[j].teamName === applicants[i].formalinformal && teams[j].eventName === 'formalinformal') {
            flag = true;
            break;
          }
        }
        if (flag === false) {
          console.log(`Error in id ${ applicants[i].id } with team ${ applicants[i].formalinformal } for event formalinformal`);
        }
      }
      if (applicants[i].codezilla) {
        let flag = false;
        for(let j = 0; j < teams.length; j++) {
          if (teams[j].teamName === applicants[i].codezilla && teams[j].eventName === 'codezilla') {
            flag = true;
            break;
          }
        }
        if (flag === false) {
          console.log(`Error in id ${ applicants[i].id } with team ${ applicants[i].codezilla } for event codezilla`);
        }
      }
      if (applicants[i].illuminati) {
        let flag = false;
        for(let j = 0; j < teams.length; j++) {
          if (teams[j].teamName === applicants[i].illuminati && teams[j].eventName === 'illuminati') {
            flag = true;
            break;
          }
        }
        if (flag === false) {
          console.log(`Error in id ${ applicants[i].id } with team ${ applicants[i].illuminati } for event illuminati`);
        }
      }
    }
  });
});
