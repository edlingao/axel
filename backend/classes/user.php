<?php
namespace backend;

class User {
  private $database = null;
 
  public function __construct($database)
  {
    $this->database = $database;
  }

  public function getUsers() {
    $query = "SELECT * FROM user";
    $result = $this->database->query($query);
    $users = array();
    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }
    return json_encode($users);
  }

  public function getUser($id) {
    $query = "SELECT * FROM user WHERE id_user = " . $id;
    $result = $this->database->query($query);
    $user = $result->fetch_assoc();
    return json_encode($user);
  }

  public function login($email, $password) {
    $query = "SELECT * FROM user WHERE email = '" . $email . "' AND password = '" . $password . "'";
    $result = $this->database->query($query);
    $user = array();
    while ($row = $result->fetch_assoc()) {
      $user[] = $row;
    }
    return json_encode($user);
  }

  public function register($name, $email, $password) {
    $query = "INSERT INTO user (name, email, password) VALUES ('$name', '$email', '$password')";
    $result = $this->database->query($query);
    return json_decode($result);
  }
}