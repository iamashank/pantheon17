"use strict";function eventClick(e){$.post("https://pantheon17.in/api/events/getEventById",{id:e}).done(function(n){$("#id").val(e),$("#name").val(n.name),$("#club").val(n.club),$("#teamSize").val(n.teamSize),$("#description").val(n.description),$("#day").val(n.day),$("#time").val(n.time),$("#venue").val(n.venue),$("#status").val(n.status),$("#eventCoordinator1Name").val(n.eventCoordinator1.name),$("#eventCoordinator1PhoneNumber").val(n.eventCoordinator1.phoneNumber),$("#eventCoordinator2Name").val(n.eventCoordinator2.name),$("#eventCoordinator2PhoneNumber").val(n.eventCoordinator2.phoneNumber),$(".event-form").css("display","block"),$(".list-group").hide(0)})}$(function(){$.get("https://pantheon17.in/api/events/getAllEvents",function(e){$(".loading").hide(0);for(var n=0;n<e.length;n++)$(".list-group").append('\n      <div class="list-group-item" style="cursor: pointer" eventId="'+e[n].eventId+'">\n        <h3 align="center" class="page-header">'+e[n].name+'</h3>\n        <div class="row" style="text-align: center">\n        <div class="col-sm-4">\n          <p>Event Id:- '+e[n].eventId+'</p>\n        </div>\n          <div class="col-sm-4">\n            <p>Status:- '+e[n].status+'</p>\n          </div>\n          <div class="col-sm-4">\n            <p>Day '+e[n].day+", Time - "+e[n].time+", Venue - "+e[n].venue+'</p>\n          </div>\n        </div>\n        <button class="btn btn-primary btn-sm" onclick="eventClick('+e[n].eventId+')">View or edit</button>\n      </div>\n      ')})});