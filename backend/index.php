<?php
  include_once('classes/database.php');

  $database = new  backend\DatabaseConnector('localhost', 'root', 'marvel99', 'test');


  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Methods:*');
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");
?>

