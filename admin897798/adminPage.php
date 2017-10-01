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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js"></script>
  <script src="admin-page.js"></script>
  <title>AdminPage | Pantheon</title>
</head>
<body>
  <div class="container">
    <h2 align="center" class="page-header">Admin Page - Pantheon 2017</h2>
    <div class="row">
      <div class="col-sm-4" style="height: 80vh; border-right: 2px solid black; overflow: auto">
        <h3 align="center" class="page-header">Recent Announcements</h3>
        <ul class="list-group">
        </ul>
      </div>
      <div class="col-sm-8">
        <h3 align="center" class="page-header">New Announcement</h3>
        <form class="event-form" action="https://pantheon17.in/api/announcements/addAnnouncement" method="post" style="max-width: 800px; margin: 10px auto;">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" name="title" id="title" required>
          </div>
          <div class="form-group">
            <label for="description">Message</label>
            <textarea type="text" class="form-control" name="message" id="message" required></textarea>
            Note:- Place the proper html tags wherever required.
          </div>
          <button type="submit" class="btn btn-sm btn-primary">Submit</button>
        </form>
        <div class="additional-btn" style="display: flex; justify-content: center; margin-top: 50px;">
          <a href="sap.php" class="btn btn-success" style="margin: 10px 15px;">View SAP</a>
          <a href="addEvent.php" class="btn btn-success" style="margin: 10px 15px;">Add Event</a>
          <a href="editEvent.php" class="btn btn-success" style="margin: 10px 15px;">Edit Event</a>
          <a href="teams.php" class="btn btn-success" style="margin: 10px 15px;">View Teams</a>
        </div>
        <div class="additional-btn" style="display: flex; justify-content: center; margin-top: 20px;">
          <a href="searchapplicants.php" class="btn btn-success" style="margin: 10px 15px;">Search Applicants</a>
          <a href="applicant.php" class="btn btn-success" style="margin: 10px 15px;">View Applicant Info</a>
          <a href="logout.php" class="btn btn-success" style="margin: 10px 15px;">Logout</a>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
