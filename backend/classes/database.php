<?php 
namespace backend;
use mysqli;
class DatabaseConnector {
  private $database = null;
  private $db = null;
  public function __construct($host, $user, $pass, $db)
  {
    $this->db = $db;
    $this->database = new mysqli($host, $user, $pass, $db);
    if (!$this->database) {
      mysqli_close($this->database);
      die('No pudo conectarse: ' . mysqli_error($this->database));
    }

    $this->createTablesIfNotExists('user', "
      id_user INT(6) UNSIGNED AUTO_INCREMENT,
      name VARCHAR(30) NOT NULL,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(50) NOT NULL,
      PRIMARY KEY (id_user)"
    );

    $this->createTablesIfNotExists('post', "
      id_post INT(6) UNSIGNED AUTO_INCREMENT,
      user_id INT(6) UNSIGNED,
      title VARCHAR(30) NOT NULL,
      body VARCHAR(50) NOT NULL,
      PRIMARY KEY (id_post),
      FOREIGN KEY (user_id) REFERENCES user(id_user)"
    );

    $this->createTablesIfNotExists('comment', "
      id_comment INT(6) UNSIGNED AUTO_INCREMENT,
      user_id INT(6) UNSIGNED,
      post_id INT(6) UNSIGNED,
      name VARCHAR(30) NOT NULL,
      comment VARCHAR(50) NOT NULL,
      PRIMARY KEY (id_comment),
      FOREIGN KEY (user_id) REFERENCES user(id_user) ON DELETE CASCADE,
      FOREIGN KEY (post_id) REFERENCES post(id_post) ON DELETE CASCADE"
    );
  }

  public function getConnection()
  {
      return $this->database;
  }

  public function closeConnection()
  {
      mysqli_close($this->database);
  }

  public function createTablesIfNotExists($table, $fields) {
    $query = "CREATE TABLE IF NOT EXISTS " . $table . "( " . $fields . " );";
    $result = $this->database->query($query);
    return json_decode($result);
  }
}