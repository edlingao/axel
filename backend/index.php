<?php
  include_once('classes/database.php');

  $database = new  backend\DatabaseConnector('localhost', 'root', 'marvel99', 'test');

  header('Content-Type', 'application/json');
?>

