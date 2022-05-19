<?php 
namespace backend;

class Comment {
  private $database = null;
  
  public function __construct($database)
  {
    $this->database = $database;
  }
  
  public function getComment($post_id) {
    $query = "SELECT * FROM comment WHERE id_post = " . $post_id;
    $result = $this->database->query($query);
    $comments = array();
    while ($row = $result->fetch_assoc()) {
      $comments[] = $row;
    }
    return json_encode($comments);
  }
  
  public function createComment($post_id, $user_id, $body) {
    $query = "INSERT INTO comment (post_id, user_id, body) VALUES ('$post_id', '$user_id', '$body')";
    $result = $this->database->query($query);
    return json_decode($result);
  }
  
  public function updateComment($id, $post_id, $user_id, $body) {
    $query = "UPDATE comment SET post_id = '$post_id', user_id = '$user_id', body = '$body' WHERE id = " . $id;
    $result = $this->database->query($query);
    return json_decode($result);
  }
  
  public function deleteComment($id) {
    $query = "DELETE FROM comment WHERE id = " . $id;
    $result = $this->database->query($query);
    return json_decode($result);
  }
}
