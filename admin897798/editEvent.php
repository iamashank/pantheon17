<?php
  session_start();
  if((!isset($_SESSION['adminKey'])) || $_SESSION['adminKey']!="8abd5b6492cdad380d53dd2f5b9112b4"){
    header('location: index.php');
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  <script src="event.js"></script>
  <title>Events | Admin</title>
</head>
<body>
  <h2 style="text-align: center; margin: 20px">Events</h2>
  <h3 class="loading" style="text-align: center; margin-top: 50px">Loading...</h3>
  <form class="event-form" action="https://pantheon17.in/api/events/editEvent" method="post" style="max-width: 800px; margin: 10px auto; display: none;">
    <h3 align="center">Edit Event</h3>
    <div class="form-group">
      <input type="hidden" class="form-control" name="id" id="id" required>
    </div>
    <div class="form-group">
      <label for="name">Event Name</label>
      <input type="text" class="form-control" name="name" id="name" readonly required>
    </div>
    <div class="form-group">
      <label for="club">Organizing Club</label>
      <input type="text" class="form-control" name="club" id="club" required>
    </div>
    <div class="form-group">
      <label for="teamSize">Team Size</label>
      <input type="text" class="form-control" name="teamSize" id="teamSize" placeholder="Example: - 2-3 members" >
    </div>
    <div class="form-group">
      <label for="description">Event Description</label>
      <textarea type="text" class="form-control" name="description" id="description" required></textarea>
      Note:- Place the proper html tags wherever required.
    </div>
    <div class="form-group">
      <label for="day">Day</label>
      <input type="number" min="1" max="3" class="form-control" id="day" name="day" placeholder="Ex:- 2">
    </div>
    <div class="form-group">
      <label for="time">Time</label>
      <input type="time" class="form-control" id="time24" name="time24">
    </div>
    <div class="form-group">
      <label for="venue">Venue</label>
      <input type="text" class="form-control" name="venue" id="venue" placeholder="Ex:- Room 302">
    </div>
    <div class="form-group">
      <label for="status">Status</label>
      <input type="text" class="form-control" name="status" id="status" placeholder="Ex:- Scheduled">
    </div>
    <div class="form-group">
      <label for="status">Points 1</label>
      <input type="text" class="form-control" name="points1" id="points1" placeholder="Points for first position">
    </div>
    <div class="form-group">
      <label for="status">Points 2</label>
      <input type="text" class="form-control" name="points2" id="points2" placeholder="Points for second position">
    </div>
    <div class="form-group">
      <label for="status">Points 3</label>
      <input type="text" class="form-control" name="points3" id="points3" placeholder="Points for third position">
    </div>
    <div class="form-group">
      <label for="eventCoordinator1Name">Event Co-ordinator1 Name</label>
      <input type="text" class="form-control" name="eventCoordinator1Name" id="eventCoordinator1Name" required>
    </div>
    <div class="form-group">
      <label for="eventCoordinator1PhoneNumber">Event Co-ordinator1 Phone Number</label>
      <input type="text" class="form-control" name="eventCoordinator1PhoneNumber" id="eventCoordinator1PhoneNumber" required>
    </div>
    <div class="form-group">
      <label for="eventCoordinato2Name">Event Co-ordinator2 Name</label>
      <input type="text" class="form-control" name="eventCoordinator2Name" id="eventCoordinator2Name">
    </div>
    <div class="form-group">
      <label for="eventCoordinator2PhoneNumber">Event Co-ordinator2 Phone Number</label>
      <input type="text" class="form-control" name="eventCoordinator2PhoneNumber" id="eventCoordinator2PhoneNumber">
    </div>
    <div class="form-group">
      <label for="description">Edit Message</label>
      <textarea type="text" class="form-control" name="editMessage" id="editMessage" placeholder="Ex:- The event has been resheduled to 5:30pm. Sorry for the inconvenience." required></textarea>
      <p>
        Note:- This message will go as a notification in the app.
      </p>
    </div>
    <button type="submit" class="btn btn-sm btn-primary">Submit</button>
  </form>
  <ul class="list-group" style="max-width: 1000px; margin: 10px auto;">
  </ul>
</body>
</html>
